import { CALCULATED, X_AXIS, Y_AXIS } from '../../../utils/constants';
import { LunaticExpression, LunaticState, LunaticVariable } from '../../type';
import { ExpressionLogger } from './create-execute-expression';
import {
	deepForEach,
	deepLengths,
	deepSet,
	extractValue,
} from '../../../utils/array';

type Args = {
	variables: LunaticState['variables'];
	bindings: { [variableName: string]: unknown };
	execute: (
		expObject: unknown,
		args: {
			iteration?: number[];
			// Iteration numbers for pairwise values
			linksIterations?: [number, number];
			logging?: ExpressionLogger;
		}
	) => unknown;
};

/**
 * Refresh calculated variables with the new value in the bindings
 */
function createRefreshCalculated({ variables, execute, bindings }: Args) {
	const toRefreshVariables = new Map<string, LunaticVariable>(); // variables calculées dépendantes d'une variable modifiée.

	// Find all calculated variable
	Object.values(variables).forEach(function ({ variable }) {
		const { variableType, name } = variable;
		if (variableType === CALCULATED) {
			toRefreshVariables.set(name, variable);
		}
	});

	function buildValue(args: {
		expression: LunaticExpression;
		name: string;
		iteration?: number[];
		linksIterations?: number[];
		logging?: ExpressionLogger;
		shapeFrom?: string;
	}) {
		const { expression, logging, shapeFrom, name, iteration, linksIterations } =
			args;

		// For pairwise expression, we need to emulate an iteration
		if (linksIterations) {
			return execute(expression, {
				logging,
				iteration: [name === X_AXIS ? linksIterations[0] : linksIterations[1]],
			});
		}

		// We need to mimic the shape of another variable (we are in a loop)
		if (shapeFrom) {
			const fromShapeValue = bindings[shapeFrom];
			// The variable is not yet defined
			let calculatedValue = bindings[name];
			// We have no value to start with, create the whole array from the shape
			if (
				Array.isArray(fromShapeValue) &&
				((iteration?.length ?? 0) === 0 || calculatedValue === undefined)
			) {
				deepForEach(fromShapeValue, (_, index) => {
					const value = execute(expression, { logging, iteration: index });
					calculatedValue = deepSet(
						calculatedValue,
						value,
						index,
						deepLengths(fromShapeValue, index.slice(0, -1))
					);
				});
				bindings[name] = calculatedValue;
				return extractValue(calculatedValue, iteration ?? []);
			}
			// Value is already calculated, update the value for the requested iteration
			calculatedValue = deepSet(
				calculatedValue,
				execute(expression, { logging, iteration }),
				iteration ?? [],
				deepLengths(fromShapeValue, iteration?.slice(0, -1) ?? [])
			);
			bindings[name] = calculatedValue;
			return extractValue(calculatedValue, iteration ?? []);
		}

		bindings[name] = execute(expression, { logging });
		return bindings[name];
	}

	function refreshCalculated(
		map: { [variableName: string]: unknown },
		{
			rootExpression,
			iteration,
			linksIterations,
		}: {
			rootExpression?: string;
			iteration?: number[];
			linksIterations?: number[];
		} = {}
	) {
		return Object.entries(map).reduce(function (sub, [name, current]) {
			const calculatedVariable = variables[name];
			if (
				calculatedVariable.variable.variableType === CALCULATED &&
				toRefreshVariables.has(name)
			) {
				const { expression, shapeFrom } = calculatedVariable.variable;

				const logging: ExpressionLogger = (expression, bindings, e) => {
					if (process.env.NODE_ENV === 'development') {
						console.warn(
							`VTL error when refreshing calculated variable ${name} :  ${
								typeof expression === 'string' ? expression : expression.value
							}`,
							{ bindings }
						);
						console.warn(`root expression : ${rootExpression}`);
						console.warn(e);
					}
				};
				const value = buildValue({
					expression,
					logging,
					shapeFrom,
					name,
					iteration,
					linksIterations,
				});
				if (iteration !== undefined) toRefreshVariables.delete(name);
				return { ...sub, [name]: value };
			}
			return { ...sub, [name]: current };
		}, {} as Record<string, unknown>);
	}

	function setToRefreshCalculated(name: string, variable: LunaticVariable) {
		toRefreshVariables.set(name, variable);
	}

	return [refreshCalculated, setToRefreshCalculated] as const;
}

export default createRefreshCalculated;
