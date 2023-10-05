import { interpretVTL, parseVTLVariables } from '../../../utils/vtl';
import { isTestEnv } from '../../../utils/env';
import type { LunaticSource } from '../../type-source';
import type { LunaticData } from '../../type';
import { getInitialVariableValue } from '../../../utils/variables';
import { resizingBehaviour } from './behaviours/resizing-behaviour';
import { cleaningBehaviour } from './behaviours/cleaning-behaviour';
import { missingBehaviour } from './behaviours/missing-behaviour';
import { setAtIndex } from '../../../utils/array';
import { isNumber } from '../../../utils/number';

// Interpret counter, used for testing purpose
let interpretCount = 0;

type IterationLevel = number[];
type EventArgs = {
	change: {
		// Name of the changed variable
		name: string;
		// New value for the variable
		value: unknown;
		// Iteration changed (for array)
		iteration?: IterationLevel | undefined;
	};
};
export type LunaticVariablesStoreEvent<T extends keyof EventArgs> = {
	detail: EventArgs[T];
};

export class LunaticVariablesStore {
	private dictionary = new Map<string, LunaticVariable>();
	private eventTarget = new EventTarget();

	constructor() {
		interpretCount = 0;
	}

	public static makeFromSource(source: LunaticSource, data: LunaticData) {
		const store = new LunaticVariablesStore();
		if (!source.variables) {
			return store;
		}
		const initialValues = Object.fromEntries(
			source.variables.map((variable) => [
				variable.name,
				getInitialVariableValue(variable, data),
			])
		);
		const getIterationDepth = (name: string) => {
			if (name === 'xAxis') return 0;
			if (name === 'yAxis') return 1;
			return undefined;
		};
		for (const variable of source.variables) {
			switch (variable.variableType) {
				case 'CALCULATED':
					store.setCalculated(variable.name, variable.expression.value, {
						dependencies: variable.bindingDependencies,
						iterationDepth: getIterationDepth(variable.name),
					});
					break;
				case 'COLLECTED':
				case 'EXTERNAL':
					store.set(variable.name, initialValues[variable.name ?? null]);
					break;
			}
		}
		resizingBehaviour(store, source.resizing);
		cleaningBehaviour(store, source.cleaning, initialValues);
		missingBehaviour(store, source.missingBlock);
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
	 * Set variable value
	 */
	public set(
		name: string,
		value: unknown,
		args: Pick<EventArgs['change'], 'iteration'> = {}
	): LunaticVariable {
		if (!this.dictionary.has(name)) {
			this.dictionary.set(
				name,
				new LunaticVariable({
					name,
				})
			);
		}
		const variable = this.dictionary.get(name)!;
		if (variable.setValue(value, args.iteration)) {
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
		}: { dependencies?: string[]; iterationDepth?: number } = {}
	): LunaticVariable {
		if (this.dictionary.has(name)) {
			return this.dictionary.get(name)!;
		}
		const variable = new LunaticVariable({
			expression: expression,
			dictionary: this.dictionary,
			dependencies,
			iterationDepth,
			name,
		});
		this.dictionary.set(name, variable);
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

	// Retrieve the number of interpret() run (used in testing only)
	get interpretCount() {
		return interpretCount;
	}
}

class LunaticVariable {
	// Last time the value was updated (changed)
	public updatedAt = new Map<undefined | string, number>();
	// Last time "calculation" was run (for calculated variable)
	private calculatedAt = new Map<undefined | string, number>();
	// Internal value for the variable
	private value: unknown;
	// List of dependencies, ex: ['FIRSTNAME', 'LASTNAME']
	private dependencies?: string[];
	// Expression for calculated variable
	private readonly expression?: string;
	// Dictionary holding all the available variables
	private readonly dictionary?: Map<string, LunaticVariable>;
	// Specific iteration depth to get value from dependencies (used for yAxis for instance)
	private readonly iterationDepth?: number;
	// Keep a record of variable name (optional, used for debug)
	private readonly name?: string;

	constructor(
		args: {
			expression?: string;
			dependencies?: string[];
			dictionary?: Map<string, LunaticVariable>;
			iterationDepth?: number;
			name?: string;
		} = {}
	) {
		if (args.expression && !args.dictionary) {
			throw new Error(
				`A calculated variable needs a dictionary to retrieve his deps`
			);
		}
		this.expression = args.expression;
		this.dictionary = args.dictionary;
		this.dependencies = args.dependencies;
		this.iterationDepth = args.iterationDepth;
		this.name = args.name ?? args.expression;
	}

	getValue(iteration?: IterationLevel): unknown {
		// The variable is not calculated
		if (!this.expression) {
			return this.getSavedValue(iteration);
		}
		// Calculate bindings first to refresh "updatedAt" on calculated dependencies
		const bindings = this.getDependenciesValues(iteration);
		if (!this.isOutdated(iteration)) {
			return this.getSavedValue(iteration);
		}
		if (isTestEnv()) {
			interpretCount++;
		}
		// Remember the value
		try {
			this.setValue(interpretVTL(this.expression, bindings), iteration);
		} catch (e) {
			throw new Error(
				`Cannot interpret expression "${
					this.expression
				}" with bindings ${JSON.stringify(bindings)}, error : ${(
					e as Error
				).toString()}`
			);
		}
		this.calculatedAt.set(iteration?.join('.'), performance.now());
		this.calculatedAt.set(undefined, performance.now());
		return this.getSavedValue(iteration);
	}

	/**
	 * Set the value and returns true if the variable is touched
	 */
	setValue(value: unknown, iteration?: IterationLevel): boolean {
		if (value === this.getSavedValue(iteration)) {
			return false;
		}
		// Decompose arrays, to only update items that changed
		if (Array.isArray(value) && !Array.isArray(iteration)) {
			return !!value.map((v, k) => this.setValue(v, [k])).find((v) => v);
		}
		// We want to save a value at a specific iteration, but the value is not an array yet
		if (iteration !== undefined && !Array.isArray(this.value)) {
			this.value = [];
		}
		this.value = !Array.isArray(iteration)
			? value
			: setAtIndex(this.value, iteration, value);
		this.updatedAt.set(iteration?.join('.'), performance.now());
		this.updatedAt.set(undefined, performance.now());
		return true;
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
					const dependencyIteration =
						isNumber(this.iterationDepth) && Array.isArray(iteration)
							? [iteration[this.iterationDepth]]
							: iteration;
					return [
						dep,
						this.dictionary?.get(dep)?.getValue(dependencyIteration),
					];
				})
			);
		} catch (e) {
			if (e instanceof RangeError) {
				throw new Error(
					`Cannot resolve dependencies for "${
						this.expression
					}" with dependencies ${JSON.stringify(
						this.getDependencies()
					)} \n ${e.toString()}`
				);
			}
			throw e;
		}
	}

	private isOutdated(iteration?: IterationLevel): boolean {
		const dependenciesUpdatedAt = Math.max(
			0,
			...this.getDependencies().map(
				(dep) =>
					this.dictionary?.get(dep)?.updatedAt.get(iteration?.join('.')) ?? 0
			)
		);
		return (
			dependenciesUpdatedAt >
			(this.calculatedAt.get(iteration?.join('.')) ?? -1)
		);
	}
}
