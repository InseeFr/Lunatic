import type {
	IterationLevel,
	LunaticVariablesStore,
} from '../lunatic-variables-store';
import type { LunaticSource } from '../../../type';
import { depth } from '../../../../utils/array';
import { castBool } from '../../../../utils/cast';

/**
 * Cleaning behaviour for the store
 * When a variable changes, other variables can be reset
 */
export function cleaningBehaviour(
	store: LunaticVariablesStore,
	cleaning: LunaticSource['cleaning'],
	// Value used as default when cleaning a variable, correspoding to value of variable in source.json (not data)
	sourceValues: Record<string, unknown> = {}
) {
	if (!cleaning) {
		return;
	}

	// Create calculated variables from cleaning expressions
	for (const source in cleaning) {
		for (const target in cleaning[source]) {
			if (Array.isArray(cleaning[source][target])) {
				for (const cleaningInfo of cleaning[source][target]) {
					store.setCalculated(
						cleaningInfo.expression,
						cleaningInfo.expression,
						{
							shapeFrom: cleaningInfo.shapeFrom,
						}
					);
				}
			}
		}
	}

	// Create a map to improve performance
	const cleaningMap = new Map(Object.entries(cleaning));

	store.on('change', (e) => {
		const cleaningInfo = cleaningMap.get(e.detail.name);
		const iteration = e.detail.iteration;

		// The variable does not have cleaning
		if (!cleaningInfo) {
			return;
		}

		for (const variableName in cleaningInfo) {
			try {
				// First: check if variable is already cleaned i.e, value is `null`, empty or list of `null`
				if (isAlreadyCleaned(store, variableName)) continue;
				// Second: check if variable should be clean i.e one of expressions is true

				// shouldClean is simple boolean or array of boolean if there have a shapeFrom
				const shouldCleanResult = shouldClean(store, {
					expressions: cleaningInfo[variableName],
					iteration: iteration,
					isResizing: e.detail.cause === 'resizing',
				});

				if (Array.isArray(shouldCleanResult)) {
					cleanArrayVariableAccordingCondition(
						store,
						sourceValues,
						variableName,
						shouldCleanResult
					);
					continue;
				}
				if (shouldCleanResult)
					cleanVariable(store, sourceValues, variableName, iteration);
			} catch (e) {
				// If we have an error, skip this cleaning
				console.error(e);
			}
		}
	});
}

function isAlreadyCleaned(store: LunaticVariablesStore, variableName: string) {
	const value = store.get(variableName);
	if (Array.isArray(value)) return value.every((v) => v === null);
	if (value === null) return true;
}

/**
 * Check if a variable need to be cleaned
 */
function shouldClean(
	store: LunaticVariablesStore,
	{
		// The expressions are a list of condition filter to display the variable, so we should clean if the filter is evaluated to false (false = variable is not visible)
		expressions,
		iteration,
		isResizing,
	}: {
		expressions:
			| string
			| {
					expression: string;
					shapeFrom?: string;
					isAggregatorUsed: boolean;
			  }[];
		iteration?: number[];
		isResizing: boolean;
	}
) {
	// Legacy cleaning used a simple string
	if (typeof expressions === 'string') {
		return !castBool(
			store.run(expressions, {
				iteration,
			})
		);
	}

	// New format use tuples { expression, shapeFrom,  isAggregatorUsed }
	if (isResizing) {
		// If we are resizing a variable, only run expression containing aggregators (count(), sum()...)
		expressions = expressions.filter((expr) => expr.isAggregatorUsed);
	}

	// here, value has change in root scope, but we have to to check for each iteration of variable
	if (hasShapeFrom(expressions) && !iteration) {
		const shapeFromVariable = store.get(
			expressions[0].shapeFrom as string
		) as Array<unknown>;

		const shouldCleanArray = new Array(shapeFromVariable.length).fill(
			false
		) as Array<boolean>;

		for (const [iterationIndex] of shouldCleanArray.entries()) {
			shouldCleanArray[iterationIndex] = shouldClean(store, {
				expressions,
				iteration: [iterationIndex],
				isResizing,
			}) as boolean;
		}
		return shouldCleanArray;
	} else {
		// if only one expression is false, we have to clean (condition is display condition)
		for (const expression of expressions) {
			// Run the expression to check if cleaning should happen
			if (
				!store.run(expression.expression, {
					iteration,
				})
			)
				return true;
		}

		return false;
	}
}

function getValueAtIteration(value: unknown, iteration?: number[]) {
	if (!iteration || iteration.length === 0) {
		return value ?? null;
	}
	if (!Array.isArray(value)) {
		return null;
	}
	return getValueAtIteration(value[iteration[0]], iteration.slice(1));
}

/**
 * hasShapeFrom
 * actually, in cleaning modelisation,
 * all expressions have no shapeFrom or have the **same** shapeFrom
 * @param expressions
 * @returns boolean if all expression has shapeFrom
 *
 */
function hasShapeFrom(
	expressions: {
		expression: string;
		shapeFrom?: string;
		isAggregatorUsed: boolean;
	}[]
) {
	return expressions.every(
		(expression) =>
			expression.shapeFrom !== null && expression.shapeFrom !== undefined
	);
}

function cleanArrayVariableAccordingCondition(
	store: LunaticVariablesStore,
	sourceValues: Record<string, unknown>,
	variableName: string,
	shouldClean: boolean[]
) {
	for (const [iteration, shouldCleanByIteration] of shouldClean.entries()) {
		if (shouldCleanByIteration)
			cleanVariable(store, sourceValues, variableName, [iteration]);
	}
}

/**
 * cleanVariable: this function set to null (and not initalValue) the variable at iteration
 * @param store
 * @param variableName
 * @param iteration
 */
function cleanVariable(
	store: LunaticVariablesStore,
	sourceValues: Record<string, unknown>,
	variableName: string,
	iteration: IterationLevel | undefined
) {
	// Variable may be top level, so we need to deduce expected iteration
	const variableDepth = depth(sourceValues[variableName]);
	const variableIteration =
		variableDepth === 0
			? undefined
			: iteration?.slice(0, depth(sourceValues[variableName]));

	store.set(
		variableName,
		getValueAtIteration(sourceValues[variableName], variableIteration),
		{
			iteration: variableIteration,
			cause: 'cleaning',
		}
	);
}
