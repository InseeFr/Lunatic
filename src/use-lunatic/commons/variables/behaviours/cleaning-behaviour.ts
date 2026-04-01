import {
	getChangedKey,
	type LunaticVariablesStore,
} from '../lunatic-variables-store';
import type { LunaticSource } from '../../../type';
import { depth, setAtIndex } from '../../../../utils/array';
import { castBool } from '../../../../utils/cast';
import { IterationLevel } from '../models';

type CleaningExpression = {
	expression: string;
	shapeFrom?: string;
	isAggregatorUsed: boolean;
	shouldCheckAllIterations?: boolean;
};

/**
 * Implements the cleaning behavior for the variable store.
 * When a variable changes, this function determines which other variables
 * should be reset based on the cleaning rules defined in the source.
 *
 * @param store - The variables store that manages all variable values
 * @param cleaning - Cleaning rules from the Lunatic source
 * @param sourceValues - Default values from source.json to use when cleaning variables
 */
export function cleaningBehaviour(
	store: LunaticVariablesStore,
	cleaning: LunaticSource['cleaning'],
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

	// Convert cleaning object to Map for faster lookups
	const cleaningMap = new Map(Object.entries(cleaning));

	store.on('change', (e) => {
		const cleaningInfo = cleaningMap.get(e.detail.name);
		const iteration = e.detail.iteration;

		// Skip if the changed variable doesn't have any cleaning rules
		if (!cleaningInfo) {
			return;
		}

		for (const variableName in cleaningInfo) {
			try {
				// Skip if variable to be cleaned (variableName) is the variable causing the change (case in questionnaire (fix later in generation))
				if (variableName === e.detail.name) continue;
				// Skip if variable is already in a cleaned state
				if (isAlreadyCleaned(store, variableName)) continue;

				// Determine if the variable needs cleaning based on expressions
				const shouldCleanResult = shouldClean(store, {
					expressions: cleaningInfo[variableName],
					iteration: iteration,
					isResizing: e.detail.cause === 'resizing',
				});

				// Handle array variables (where we might need to clean specific indexes)
				if (Array.isArray(shouldCleanResult)) {
					cleanArrayVariableAccordingCondition(
						store,
						sourceValues,
						variableName,
						shouldCleanResult
					);
					continue;
				}

				// Clean regular variables if needed
				if (shouldCleanResult) {
					cleanVariable(store, sourceValues, variableName, iteration);
				} else {
					cancelCleanVariable(store, variableName, iteration);
				}
			} catch (e) {
				// Log error but continue processing other variables
				console.error(e);
			}
		}
	});
}

/**
 * Checks if a variable is already in a cleaned state
 *
 * @param store - The variables store
 * @param variableName - Name of the variable to check
 * @returns true if the variable is null or an array of nulls
 */
function isAlreadyCleaned(
	store: LunaticVariablesStore,
	variableName: string
): boolean {
	const value = store.get(variableName);
	if (Array.isArray(value)) return value.every((v) => v === null);
	return value === null;
}

/**
 * Determines if a variable needs to be cleaned based on expressions
 *
 * @param store - The variables store
 * @param options - Configuration options
 * @param options.expressions - Conditions that determine if cleaning should occur
 *                             (string for legacy format or array of expression objects)
 *                             /!\ Expressions comes from conditionFilter so it evaluates to "true"
 *                             if the variable is visible, meaning we need to clean if the expression
 *                             is evaluated to false.
 * @param options.iteration - Current iteration level for the variable
 * @param options.isResizing - Whether the cleaning is triggered by a resize operation
 * @returns Boolean or array of booleans indicating if cleaning should occur
 */
function shouldClean(
	store: LunaticVariablesStore,
	{
		expressions,
		iteration,
		isResizing,
	}: {
		expressions: string | CleaningExpression[];
		iteration?: number[];
		isResizing: boolean;
	}
): boolean | boolean[] {
	// Handle legacy format where expressions is a single string
	if (typeof expressions === 'string') {
		return !castBool(
			store.run(expressions, {
				iteration,
			})
		);
	}

	// Handle a new format with expression objects shaped like this { expression, shapeFrom, isAggregatorUsed }
	if (isResizing) {
		// During resize operations, only consider expressions with aggregators (count, sum...)
		expressions = expressions.filter((expr) => expr.isAggregatorUsed);
	}

	// At least one expression requires to compute on each iteration
	if (shouldCheckAtAllIterations(expressions)) {
		const expressionsToCheckAtAllIterations: CleaningExpression[] = [];
		const expressionsNotToCheckAtAllIterations: CleaningExpression[] = [];

		for (const expression of expressions) {
			if (expression.shouldCheckAllIterations) {
				expressionsToCheckAtAllIterations.push(expression);
			} else {
				expressionsNotToCheckAtAllIterations.push(expression);
			}
		}

		const shapeFromVariable = store.get(
			expressionsToCheckAtAllIterations[0].shapeFrom as string
		) as Array<unknown>;

		const shouldCleanArray = new Array(shapeFromVariable.length).fill(
			false
		) as Array<boolean>;

		for (const [iterationIndex] of shouldCleanArray.entries()) {
			shouldCleanArray[iterationIndex] =
				// check if we need to clean each iteration according to expression
				shouldCleanAtIteration(store, {
					expressions: expressionsToCheckAtAllIterations,
					iteration: [iterationIndex],
				}) ||
				shouldCleanAtIteration(store, {
					expressions: expressionsNotToCheckAtAllIterations,
					iteration,
				});
		}
		return shouldCleanArray;
	}

	// If expressions have shapeFrom and we're at root level, we need to check each iteration individually
	if (expressionsHaveShapeFrom(expressions) && !iteration) {
		const shapeFrom = findFirstExpressionWithShapeFrom(expressions)?.shapeFrom;
		const shapeFromVariable = store.get(shapeFrom as string) as Array<unknown>;

		const shouldCleanArray = new Array(shapeFromVariable.length).fill(
			false
		) as Array<boolean>;

		for (const [iterationIndex] of shouldCleanArray.entries()) {
			shouldCleanArray[iterationIndex] = shouldCleanAtIteration(store, {
				expressions,
				iteration: [iterationIndex],
			});
		}
		return shouldCleanArray;
	}

	return shouldCleanAtIteration(store, { expressions, iteration });
}

function shouldCheckAtAllIterations(expressions: CleaningExpression[]) {
	return expressions.some(
		(expression) => expression.shouldCheckAllIterations && expression.shapeFrom
	);
}

function shouldCleanAtIteration(
	store: LunaticVariablesStore,
	{
		expressions,
		iteration,
	}: {
		expressions: CleaningExpression[];
		iteration?: number[];
	}
) {
	// Clean the variable if any condition is false (variable is not visible),
	for (const expression of expressions) {
		if (
			!store.run(expression.expression, {
				iteration,
			})
		)
			return true;
	}

	// All conditions are true, no cleaning needed
	return false;
}

/**
 * Recursively retrieves a value at a specific iteration level in a nested structure
 *
 * @returns The value at the specified iteration path, or null if not found
 */
function getValueAtIteration(value: unknown, iteration?: number[]) {
	if (!iteration || iteration.length === 0) {
		return value ?? null;
	}
	if (!Array.isArray(value)) {
		return null;
	}
	return getValueAtIteration(value[iteration[0]], iteration.slice(1));
}

function hasShapeFrom(expression: CleaningExpression) {
	return expression.shapeFrom !== null && expression.shapeFrom !== undefined;
}

/**
 * Checks if all expressions in the array have a shapeFrom property
 *
 * In the cleaning model, all expressions either have no shapeFrom
 * or they all have the same shapeFrom value.
 *
 * @returns true if all expressions have a non-null shapeFrom property
 */
function expressionsHaveShapeFrom(
	expressions: {
		expression: string;
		shapeFrom?: string;
		isAggregatorUsed: boolean;
	}[]
) {
	return expressions.every((expression) => hasShapeFrom(expression));
}

function findFirstExpressionWithShapeFrom(expressions: CleaningExpression[]) {
	return expressions.find((expression) => hasShapeFrom(expression));
}

/**
 * Cleans specific elements in an array variable based on a condition array
 *
 * @param store - The variables store
 * @param sourceValues - Default values from source.json
 * @param variableName - Name of the array variable to clean
 * @param shouldClean - Array of booleans indicating which elements should be cleaned
 */
function cleanArrayVariableAccordingCondition(
	store: LunaticVariablesStore,
	sourceValues: Record<string, unknown>,
	variableName: string,
	shouldClean: boolean[]
) {
	for (const [iteration, shouldCleanByIteration] of shouldClean.entries()) {
		if (shouldCleanByIteration) {
			cleanVariable(store, sourceValues, variableName, [iteration]);
		} else {
			cancelCleanVariable(store, variableName, [iteration]);
		}
	}
}

function cancelCleanVariable(
	store: LunaticVariablesStore,
	variableName: string,
	iteration: IterationLevel | undefined
) {
	store.unqueueSet(variableName, { iteration: iteration, cause: 'cleaning' });
}

/**
 * Resets a variable to its initial value at a specific iteration level
 *
 * This function retrieves the initial value from sourceValues and sets
 * the variable to that value at the specified iteration. If the variable
 * is a pairwise variable, it uses a special cleaning method to maintain symmetry.
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

	if (cleanPairwise(store, variableName, variableIteration)) {
		return;
	}
	store.enqueueSet(
		variableName,
		getValueAtIteration(sourceValues[variableName], variableIteration),
		{
			iteration: variableIteration,
			cause: 'cleaning',
		}
	);
}

/**
 * Cleans a pairwise variable (2D array) at a specific iteration
 *
 * For pairwise variables, cleaning involves setting both the row and column
 * at the specified index to null, maintaining the symmetry of the matrix.
 *
 * @returns true if the variable was a pairwise and was cleaned, false otherwise
 */
function cleanPairwise(
	store: LunaticVariablesStore,
	variableName: string,
	iteration?: IterationLevel
): boolean {
	// We are not trying to clean a pairwise at a specific index
	if (iteration?.length !== 1) {
		return false;
	}
	const variableValue = store.get(variableName);

	// The variable is pairwise if it's a 2D array
	if (!Array.isArray(variableValue)) {
		return false;
	}
	const variableDepth = depth(variableValue);
	if (variableDepth !== 2) {
		return false;
	}

	// Clean the row and the column corresponding to the index
	store.enqueueSet(
		variableName,
		() => {
			// we need last pairwise value, so we store.get function, instead `variableValue` variable
			const pairwiseValue = store.get(variableName) as (string | null)[][];
			return pairwiseValue.map((value, k) => {
				// The value is not an array, this should not happen so we keep the original value
				if (!Array.isArray(value)) {
					return value;
				}
				// Empty the row corresponding to the index being deleted
				if (k === iteration[0]) {
					return value.fill(null);
				}
				// Nullify cells in the column corresponding to the index being deleted
				return setAtIndex(value, iteration, null);
			});
		},
		{ cause: 'cleaning' },
		// needed for canceling cleaning pairwise
		getChangedKey(variableName, iteration)
	);
	return true;
}
