import type { LunaticVariablesStore } from '../lunatic-variables-store';
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
	// Value used as default when cleaning a variable
	initialValues: Record<string, unknown> = {}
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
				if (
					!shouldClean(store, {
						expressions: cleaningInfo[variableName],
						iteration: iteration,
						isResizing: e.detail.cause === 'resizing',
					})
				) {
					continue;
				}

				// Variable may be top level, so we need to deduce expected iteration
				const variableDepth = depth(initialValues[variableName]);
				const variableIteration =
					variableDepth === 0
						? undefined
						: iteration?.slice(0, depth(initialValues[variableName]));

				store.set(
					variableName,
					getValueAtIteration(initialValues[variableName], variableIteration),
					{
						iteration: variableIteration,
						cause: 'cleaning',
					}
				);
			} catch (e) {
				// If we have an error, skip this cleaning
				console.error(e);
			}
		}
	});
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

	// New format use tuples [expression, shapeFrom]
	if (isResizing) {
		// If we are resizing a variable, only run expression containing aggregators (count(), sum()...)
		expressions = expressions.filter((expr) => expr.isAggregatorUsed);
	}

	for (const expression of expressions) {
		if (
			// Run the expression to check if cleaning should happen
			!store.run(expression.expression, {
				iteration,
			})
		) {
			return true;
		}
	}

	return false;
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
