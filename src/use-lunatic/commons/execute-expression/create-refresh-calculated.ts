import { CALCULATED, X_AXIS, Y_AXIS } from '../../../utils/constants';
import { LunaticExpression, LunaticState, LunaticVariable } from '../../type';
import { ExpressionLogger } from './create-execute-expression';

type Args = {
	variables: LunaticState['variables'];
	bindings: { [variableName: string]: unknown };
	execute: (
		expObject: unknown,
		args: {
			iteration?: number[];
			linksIterations?: number[];
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

	function getIteration({
		name,
		iteration,
		linksIterations,
	}: {
		name: string;
		iteration?: number[];
		linksIterations?: number[];
	}) {
		if (name === X_AXIS && linksIterations) return linksIterations[0];
		if (name === Y_AXIS && linksIterations) return linksIterations[1];
		return iteration;
	}

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
		const value = execute(expression, {
			logging,
			iteration: shapeFrom
				? [getIteration({ name, iteration, linksIterations })!]
				: undefined,
		});
		if (linksIterations !== undefined) return value;
		if (shapeFrom && iteration !== undefined) {
			if (bindings[name] === undefined) {
				const shapeVariable = bindings[shapeFrom];
				if (Array.isArray(shapeVariable)) {
					const initialValue = shapeVariable.map((_, i) =>
						execute(expression, {
							logging,
							iteration: [i],
						})
					);
					bindings[name] = initialValue;
					return initialValue[iteration];
				}
			}
			const binding = bindings[name];
			if (Array.isArray(binding)) {
				binding[iteration] = value;
				return binding[iteration];
			} else {
				console.error(`Binding not array! ${bindings[name]} for ${name}`);
				bindings[name] = null;
				return null;
			}
		} else if (shapeFrom && iteration === undefined) {
			// TODO: optimize
			const baseVar = bindings[shapeFrom];
			if (Array.isArray(baseVar)) {
				const v = baseVar.map((_, i) =>
					execute(expression, {
						logging,
						iteration: [i],
					})
				);
				bindings[name] = v;
				return v;
			}
		}
		bindings[name] = value;
		return value;
	}

	function refreshCalculated(
		map: { [variableName: string]: unknown },
		{
			rootExpression,
			iteration,
			linksIterations,
		}: {
			rootExpression?: string;
			iteration?: number;
			linksIterations?: number[];
		}
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
		}, {});
	}

	function setToRefreshCalculated(name: string, variable: LunaticVariable) {
		toRefreshVariables.set(name, variable);
	}

	return [refreshCalculated, setToRefreshCalculated] as const;
}

export default createRefreshCalculated;
