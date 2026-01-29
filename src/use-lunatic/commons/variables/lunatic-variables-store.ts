import { interpretVTL, parseVTLVariables } from '../../../utils/vtl';
import { isTestEnv } from '../../../utils/env';
import type { LunaticData, LunaticOptions, LunaticSource } from '../../type';
import { getInitialVariableValue } from '../../../utils/variables';
import { resizingBehaviour } from './behaviours/resizing-behaviour';
import { cleaningBehaviour } from './behaviours/cleaning-behaviour';
import { missingBehaviour } from './behaviours/missing-behaviour';
import {
	findLongest,
	setAtIndex,
	subArrays,
	times,
} from '../../../utils/array';
import { isNumber } from '../../../utils/number';
import type { RefObject } from 'react';
import {
	VTLInterpretationError,
	VTLMissingDependencies,
	VTLMissingDependency,
} from './errors';
import {
	computePairwiseGlobalVariables,
	computePairwiseGlobalVariableValue,
	PairwiseGlobalDependency,
} from './pairwise-variables';
import {
	computeGlobalIterationIndexValue,
	GLOBAL_ITERATION_INDEX,
} from './global-variables';
import { IterationLevel } from './models';

/** Interpret counter. Used for testing purpose. */
let interpretCount = 0;

export type EventArgs = {
	change: {
		/** Name of the changed variable. */
		name: string;
		/** New value for the variable. */
		value: unknown;
		/** Iteration changed (for array). */
		iteration?: IterationLevel | undefined;
		/** What triggered this change. */
		cause?: 'resizing' | 'cleaning';
		/** Force a vector when an iteration is set and the value was a scalar **/
		ignoreIterationOnScalar?: boolean;
		/** Extra sent when setting the variable. */
		[extra: string]: unknown;
	};
};

export type LunaticVariablesStoreEvent<T extends keyof EventArgs> = {
	detail: EventArgs[T];
};

/**
 * Represent a point in time (more precise than Date)
 */
class Timekey {
	private time = performance.now();
	getTime() {
		return this.time;
	}
	touch() {
		this.time = performance.now();
	}
}

export class LunaticVariablesStore {
	private dictionary = new Map<string, LunaticVariable>();
	private eventTarget = new EventTarget();
	private queue = {
		default: new Map<string, () => void>(),
		cleaning: new Map<string, () => void>(),
		resizing: new Map<string, () => void>(),
	};
	public autoCommit = false; // Commit change instantly (used in tests)
	public updatedAt = new Timekey();

	constructor() {
		interpretCount = 0;
	}

	public static makeFromSource(
		source: LunaticSource,
		data: LunaticData,
		options: {
			changeHandler?: RefObject<LunaticOptions['onVariableChange']>;
			// Disable cleaning
			disableCleaning?: boolean;
			// Do not delay resizing / cleaning
			autoCommit?: boolean;
		} = {}
	) {
		const { changeHandler, disableCleaning, autoCommit } = options;

		const store = new LunaticVariablesStore();
		if (typeof window !== 'undefined') {
			(window as any).lunaticStore = store; // Allow access to the store from the console
		}
		if (!source.variables) {
			return store;
		}
		if (autoCommit) {
			store.autoCommit = autoCommit;
		}

		// Setup pairwise global variables if there is a pairwise component
		const pairwiseVariables = computePairwiseGlobalVariables(source);
		for (const pairwiseVariable of pairwiseVariables) {
			const { name, dependencies, globalDependencies, shapeFrom } =
				pairwiseVariable;
			store.setGlobal(name, { dependencies, globalDependencies, shapeFrom });
		}

		// Source data (picked from "variables" in the source.json)s
		const sourceValues: Record<string, unknown> = {};
		// Starting data for the form (merged with data.json or injected data)
		const initialValues: Record<string, unknown> = {};
		for (const variable of source.variables) {
			sourceValues[variable.name] = getInitialVariableValue(variable);
			initialValues[variable.name] = getInitialVariableValue(variable, data);
		}
		const getIterationDepth = (name: string) => {
			if (name === 'xAxis') return 0;
			if (name === 'yAxis') return 1;
			return undefined;
		};
		store.set('1', 1); // Fake variable to use on the shapeFrom, we will use "variableDimension" in the future
		for (const variable of source.variables) {
			switch (variable.variableType) {
				case 'CALCULATED':
					// In some cases, we have calculated variables in the source that are
					// not used in the questionnaire (those variables are executed out of
					// Lunatic.), so there is no need to add them to the dictionary.
					if (variable.isIgnoredByLunatic) break;
					store.setCalculated(variable.name, variable.expression.value, {
						dependencies: variable.bindingDependencies,
						iterationDepth: getIterationDepth(variable.name),
						shapeFrom: variable.shapeFrom ?? '1',
					});
					break;
				case 'COLLECTED':
				case 'EXTERNAL':
					store.set(variable.name, initialValues[variable.name ?? null]);
					break;
			}
		}
		store.on('change', (e) => changeHandler?.current?.(e.detail));
		if (!disableCleaning) {
			cleaningBehaviour(store, source.cleaning, sourceValues);
		}
		resizingBehaviour(store, source.resizing);
		missingBehaviour(store, source.missingBlock);
		store.updatedAt.touch();
		return store;
	}

	/**
	 * Create a new store from an object (useful for testing)
	 */
	public static makeFromObject(values: Record<string, unknown> = {}) {
		const store = new LunaticVariablesStore();
		for (const name of Object.keys(values)) {
			store.set(name, values[name]);
		}
		return store;
	}

	/**
	 * Retrieve variable value
	 */
	public get<T>(name: string, iteration?: IterationLevel) {
		if (!this.dictionary.has(name)) {
			return null;
		}
		return this.dictionary.get(name)!.getValue(iteration) as T;
	}

	/**
	 * Transactional setter that will change data only when `commit()` is called
	 */
	public enqueueSet(
		name: string,
		value: unknown,
		args: Pick<EventArgs['change'], 'iteration' | 'cause'> = {}
	) {
		if (this.autoCommit) {
			this.set(name, typeof value === 'function' ? value() : value, args);
			return;
		}
		this.queue[args.cause ?? 'default'].set(
			`${name} | ${args.iteration}`,
			() => {
				// A function can be enqueued, we need to evaluate it to retrieve the value to set
				// This is used for the resizing, where we want to resize the last version of the variable
				if (typeof value === 'function') {
					value = value();
				}
				this.set(name, value, args);
			}
		);
	}

	public unqueueSet(
		name: string,
		args: Pick<EventArgs['change'], 'iteration' | 'cause'> = {}
	) {
		if (this.autoCommit) {
			return;
		}
		this.queue[args.cause ?? 'default'].delete(`${name} | ${args.iteration}`);
	}

	/**
	 * Commit all changes in the queue
	 */
	public commit() {
		const autoCommitValue = this.autoCommit;
		// Since we can have nested operation, we prevent delayed set while commiting
		this.autoCommit = true;
		Array.from(this.queue.default.values()).forEach((cb) => cb());
		Array.from(this.queue.cleaning.values()).forEach((cb) => cb());
		Array.from(this.queue.resizing.values()).forEach((cb) => cb());
		this.autoCommit = autoCommitValue;
		this.queue.default.clear();
		this.queue.cleaning.clear();
		this.queue.resizing.clear();
	}

	/**
	 * Set variable value
	 */
	public set(
		name: string,
		value: unknown,
		args: Pick<
			EventArgs['change'],
			'iteration' | 'cause' | 'ignoreIterationOnScalar'
		> = {}
	): LunaticVariable {
		this.updatedAt.touch();
		if (!this.dictionary.has(name)) {
			this.dictionary.set(
				name,
				new LunaticVariable({
					name,
					dependencies: [],
					storeUpdatedAt: this.updatedAt,
				})
			);
		}
		const variable = this.dictionary.get(name)!;
		if (variable.setValue(value, args)) {
			this.eventTarget.dispatchEvent(
				new CustomEvent('change', {
					detail: {
						...args,
						name: name,
						value: value,
					} satisfies EventArgs['change'],
				})
			);
		}
		return variable;
	}

	/**
	 * Register calculated variable
	 */
	public setCalculated(
		name: string,
		expression: string,
		{
			dependencies,
			iterationDepth,
			shapeFrom,
			dimension,
		}: {
			dependencies?: string[];
			iterationDepth?: number;
			shapeFrom?: string | string[];
			dimension?: number;
		} = {}
	): LunaticVariable {
		if (this.dictionary.has(name)) {
			return this.dictionary.get(name)!;
		}
		const variable = new LunaticVariable({
			expression: expression,
			dictionary: this.dictionary,
			shapeFrom,
			dependencies,
			iterationDepth,
			name,
			dimension,
			storeUpdatedAt: this.updatedAt,
		});
		this.dictionary.set(name, variable);
		this.updatedAt.touch();
		return variable;
	}

	/**
	 * Register global variable
	 */
	public setGlobal(
		name: string,
		{
			dependencies,
			globalDependencies,
			shapeFrom,
		}: {
			dependencies?: string[];
			globalDependencies?: Map<unknown, string>;
			shapeFrom?: string | string[];
		}
	): LunaticVariable {
		if (this.dictionary.has(name)) {
			return this.dictionary.get(name)!;
		}
		const variable = new LunaticVariable({
			dictionary: this.dictionary,
			shapeFrom,
			dependencies,
			name,
			storeUpdatedAt: this.updatedAt,
			isGlobal: true,
			globalDependencies,
		});
		this.dictionary.set(name, variable);
		this.updatedAt.touch();
		return variable;
	}

	/**
	 * Run a VTL expression
	 */
	public run(
		expression: string,
		args: { iteration?: IterationLevel; deps?: string[] } = {}
	): unknown {
		return this.setCalculated(expression, expression, {
			dependencies: args.deps,
		}).getValue(args.iteration);
	}

	/**
	 * Bind event listeners
	 */
	public on<T extends keyof EventArgs>(
		eventName: T,
		cb: (e: CustomEvent<EventArgs[T]>) => void
	): void {
		this.eventTarget.addEventListener(eventName, cb as EventListener);
	}

	/**
	 * Detach a listener
	 */
	public off<T extends keyof EventArgs>(
		eventName: T,
		cb: (e: CustomEvent<EventArgs[T]>) => void
	): void {
		this.eventTarget.removeEventListener(eventName, cb as EventListener);
	}

	/** Retrieve the number of interpret() run (used in testing only). */
	get interpretCount() {
		return interpretCount;
	}

	// Displays a table of the most calculated variable (useful for debug)
	debug() {
		console.table(
			Array.from(this.dictionary.values())
				.sort((a, b) => b.calculatedCount - a.calculatedCount)
				.slice(0, 25)
				.map((v) => ({
					name: v.name,
					calculations: v.calculatedCount,
					expression: v.expression,
				}))
		);
		console.log(
			'Total calculations : ' +
				Array.from(this.dictionary.values()).reduce(
					(acc, v) => acc + v.calculatedCount,
					0
				)
		);
		Array.from(this.dictionary.values()).map((v) => (v.calculatedCount = 0));
	}
}

export class LunaticVariable {
	/** Last time the value was updated (changed). */
	public updatedAt = new Map<undefined | string, number>();
	/** Last time the store was updated (changed). */
	private storeUpdatedAt: Timekey;
	/** Last time "calculation" was run (for calculated variable). */
	private calculatedAt = new Map<undefined | string, number>();
	/** Internal value for the variable. */
	private value: unknown;
	/** List of direct dependencies, ex: ['FULLNAME', 'FIRSTNAME', 'LASTNAME']. */
	private dependencies?: string[];
	/** Expression for calculated variable. */
	public readonly expression?: string;
	/** Dictionary holding all the available variables. */
	private readonly dictionary?: Map<string, LunaticVariable>;
	/** Specific iteration depth to get value from dependencies (used for yAxis for instance). */
	private readonly iterationDepth?: number;
	/** For calculated variable, shape is copied from another variable. */
	private readonly shapeFrom?: string[];
	/** Whether this is a global variable with custom computation rules. */
	private readonly isGlobal?: boolean;
	/** Name of variables needed for global variables computation rules. */
	private readonly globalDependencies?: Map<unknown, string>;
	/** Keep a record of variable name (optional, used for debug). */
	public readonly name?: string;
	/** Count the number of calculation. */
	public calculatedCount = 0;
	/** Dimension **/
	public dimension?: number;

	constructor(args: {
		expression?: string;
		dependencies?: string[];
		dictionary?: Map<string, LunaticVariable>;
		iterationDepth?: number;
		shapeFrom?: string | string[];
		name?: string;
		dimension?: number;
		storeUpdatedAt: Timekey;
		isGlobal?: boolean;
		globalDependencies?: Map<unknown, string>;
	}) {
		if (args.expression && !args.dictionary) {
			throw new Error(
				'A calculated variable needs a dictionary to retrieve his deps'
			);
		}
		if (args.isGlobal && args.dependencies && !args.dictionary) {
			throw new Error(
				'A global variable with dependencies needs a dictionary to retrieve its deps'
			);
		}
		if (args.isGlobal && !args.name) {
			throw new Error('A global variable needs a name to fetch its logic');
		}
		this.expression = args.expression;
		this.dictionary = args.dictionary;
		this.dependencies = args.dependencies;
		this.iterationDepth = args.iterationDepth;
		this.shapeFrom =
			typeof args.shapeFrom === 'string' ? [args.shapeFrom] : args.shapeFrom;
		this.name = args.name ?? args.expression;
		this.dimension = args.dimension;
		this.storeUpdatedAt = args.storeUpdatedAt;
		this.isGlobal = args.isGlobal || false;
		this.globalDependencies = args.globalDependencies || undefined;
	}

	getValue(iteration?: IterationLevel): unknown {
		// The variable is not calculated or a global variable
		if (!this.expression && !this.isGlobal) {
			return this.getSavedValue(iteration);
		}

		const shapeFromValue = this.shapeFrom
			? findLongest(
					this.shapeFrom.map((v) => this.dictionary?.get(v)?.getValue())
				)
			: null;
		// If we want the root value of a calculated array, loop using the shapeFrom value
		if (!iteration && Array.isArray(shapeFromValue)) {
			return shapeFromValue.map((_, k) => this.getValue([k]));
		}

		// For calculated variable, ignore iteration if shapeFrom exists and is not an array
		if (
			// We have a calculated variable (not a simple expression)
			this.name !== this.expression &&
			!Array.isArray(shapeFromValue)
		) {
			iteration = undefined;
		}

		const deps = this.getDependencies();
		const hasNoBindings = deps.length === 0;

		// A static expression should not be reevaluated
		if (hasNoBindings && this.value) {
			return this.value;
		}

		// A variable without binding is a primitive (string, boolean...)
		// it yields the same results for every iteration, so we can ignore iteration
		if (hasNoBindings) {
			iteration = undefined;
		}

		// The store did not change since the last calculation, skip further checks
		if (this.getCalculatedAt(iteration) > this.storeUpdatedAt.getTime()) {
			return this.getSavedValue(iteration);
		}

		// Calculate bindings first to refresh "updatedAt" on calculated dependencies
		const bindings = this.getDependenciesValues(iteration);
		if (this.shapeFrom && !this.isOutdated(iteration)) {
			this.updateTimestamps(iteration, 'calculatedAt');
			return this.getSavedValue(iteration);
		}
		if (isTestEnv()) {
			interpretCount++;
		}

		// Scale down iteration if its dimension > shapeFrom dimension
		const shapeDimension = arrayDimension(shapeFromValue);
		if (
			Array.isArray(iteration) &&
			Array.isArray(shapeFromValue) &&
			shapeDimension < iteration.length
		) {
			iteration = iteration.slice(0, shapeDimension);
		}

		if (this.isGlobal) {
			// compute global variable thanks to specific rule
			const value = computePairwiseGlobalVariableValue(
				this.name!,
				iteration!,
				this.globalDependencies! as Map<PairwiseGlobalDependency, string>,
				this.dictionary!
			);
			this.setValue(value, { iteration });
		} else {
			// compute thanks to VTL expression

			// Uncomment this if you want to track the number of calculation
			// this.calculatedCount++;

			// Remember the value
			try {
				this.setValue(interpretVTL(this.expression!, bindings), {
					iteration: iteration,
				});
			} catch {
				throw new VTLInterpretationError(this.expression!, bindings);
			}
		}
		this.updateTimestamps(iteration, 'calculatedAt');
		return this.getSavedValue(iteration);
	}

	/**
	 * Set the value and returns true if the variable is touched
	 */
	setValue(
		value: unknown,
		opts: { iteration?: IterationLevel; ignoreIterationOnScalar?: boolean }
	): boolean {
		const { iteration, ignoreIterationOnScalar } = opts;

		// We want to save a value at a specific iteration
		// but the value is not an array yet
		// we have to initialize the array even if we want to set an `null` or `undefined` value
		// (if no, issue with getCalculatedAt that check if this.value is an array, it return global updatedValue instead of the iteration one)
		if (iteration !== undefined && !Array.isArray(this.value)) {
			// Ignore the iteration since the value is not an array
			if (ignoreIterationOnScalar) {
				return this.setValue(value, {});
			}
			// we have to set empty array at first before compare the with the SavedValue
			this.value = [];
		}

		if (value === this.getSavedValue(iteration)) {
			return false;
		}
		// Decompose arrays, to only update items that changed
		if (Array.isArray(value) && !Array.isArray(iteration)) {
			return this.setValueForArray(value);
		}

		this.value = !Array.isArray(iteration)
			? value
			: setAtIndex(this.value, iteration, value);
		this.updateTimestamps(iteration, 'updatedAt');
		return true;
	}

	private updateTimestamps(
		iteration: IterationLevel | undefined,
		key: 'updatedAt' | 'calculatedAt'
	) {
		// Update parent iteration level timestamp
		for (const subIteration of subArrays(iteration)) {
			this[key].set(subIteration.join('.'), performance.now());
		}
		this[key].set(undefined, performance.now());
	}

	private setValueForArray(value: unknown[]): boolean {
		const savedValue = this.getSavedValue();
		const oldSize = Array.isArray(savedValue) ? savedValue.length : -1;
		const newSize = value.length;

		// We received an empty array, update value directly
		if (newSize === 0) {
			this.value = [];
			return oldSize !== newSize;
		}

		// Update every item of the array and look if we changed one item
		const oneValueChanged =
			times(Math.max(oldSize, newSize), (k) =>
				this.setValue(value[k], { iteration: [k] })
			).find((v) => v) !== undefined;
		// New array is smaller, shorten the array
		if (oldSize > newSize && Array.isArray(this.value)) {
			this.value = this.value.slice(0, newSize);
		}
		return oneValueChanged;
	}

	private getSavedValue(iteration?: IterationLevel): unknown {
		if (!Array.isArray(iteration)) {
			return this.value;
		}
		let current = this.value;
		for (const index of iteration) {
			if (!Array.isArray(current)) {
				return current;
			}
			current = current[index];
		}
		return current;
	}

	private getDependencies(): string[] {
		// Calculate dependencies from expression on the fly if necessary
		if (this.dependencies === undefined) {
			this.dependencies = parseVTLVariables(this.expression!);
		}
		return this.dependencies;
	}

	private getDependenciesValues(
		iteration?: IterationLevel
	): Record<string, unknown> {
		try {
			return Object.fromEntries(
				this.getDependencies().map((dep) => {
					// The variable is a global variable with no dependency that we can
					// manually compute on the fly.
					if (dep === GLOBAL_ITERATION_INDEX && iteration) {
						return computeGlobalIterationIndexValue(iteration);
					}

					const dependencyIteration =
						isNumber(this.iterationDepth) && Array.isArray(iteration)
							? [iteration[this.iterationDepth]]
							: iteration;

					// The variable is not registered in the variable dictionary
					// Happens when calculating unquoted VTL expression
					if (!this.dictionary || !this.dictionary?.has(dep)) {
						throw new VTLMissingDependency(this.expression!, dep);
					}

					return [dep, this.dictionary.get(dep)?.getValue(dependencyIteration)];
				})
			);
		} catch (e) {
			if (e instanceof RangeError) {
				throw new VTLMissingDependencies(
					this.expression!,
					this.getDependencies()
				);
			}
			throw e;
		}
	}

	/**
	 * Check if the variable should be updated (comparing calculatedAt to dependency updated time)
	 */
	private isOutdated(iteration?: IterationLevel): boolean {
		const deps = this.getDependencies();
		const lastCalculatedAt = this.calculatedAt.get(iteration?.join('.'));
		// Variable was never calculated
		if (!lastCalculatedAt) {
			return true;
		}

		// Look for an outdated dependency (look at updatedAt & calculatedAt date of deps)
		for (const dep of deps) {
			const depUpdatedAt =
				this.dictionary?.get(dep)?.getUpdatedAt(iteration) ?? 0;
			const depCalculatedAt =
				this.dictionary?.get(dep)?.getCalculatedAt(iteration) ?? 0;
			if (Math.max(depUpdatedAt, depCalculatedAt) > lastCalculatedAt) {
				return true;
			}
		}
		return false;
	}

	public getUpdatedAt(iteration?: IterationLevel): number {
		// The value is an array, do not look at the root updatedAt if an iteration is provided
		if (iteration !== undefined && Array.isArray(this.value)) {
			return this.updatedAt.get(iteration.join('.')) ?? 0;
		}
		// undefined key is for root level
		return this.updatedAt.get(undefined) ?? 0;
	}

	public getCalculatedAt(iteration?: IterationLevel): number {
		// The value is an array, do not look at the root calculatedAt if an iteration is provided
		if (iteration !== undefined && Array.isArray(this.value)) {
			return this.calculatedAt.get(iteration.join('.')) ?? 0;
		}
		// undefined key is for root level
		return this.calculatedAt.get(undefined) ?? 0;
	}
}

function arrayDimension(arr: unknown): number {
	if (!Array.isArray(arr)) {
		return 0;
	}
	return 1 + arrayDimension(arr[0]);
}
