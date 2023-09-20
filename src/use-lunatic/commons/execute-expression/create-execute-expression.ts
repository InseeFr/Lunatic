import executeExpression from './execute-expression';
import getSafetyExpression from './get-safety-expression';
import getExpressionVariables from './get-expressions-variables';
import createMemoizer from './create-memoizer';
import createRefreshCalculated from './create-refresh-calculated';
import { getVTLCompatibleValue } from '../../../utils/vtl';
import { VTL, VTL_MD, X_AXIS, Y_AXIS } from '../../../utils/constants';
import type { LunaticExpression, LunaticState } from '../../type';

export type ExpressionLogger = (
	expression: string | LunaticExpression,
	bindings: { [variableName: string]: unknown },
	e: unknown
) => void;
type Bindings = { [variableName: string]: unknown };

/**
 * Check the shape of the expression and convert it into an expression
 */
function validateExpression(expObject: unknown): LunaticExpression {
	if (typeof expObject === 'object' && expObject && 'type' in expObject) {
		const { type } = expObject;
		if (type === VTL || type === VTL_MD) {
			return expObject as LunaticExpression;
		}
	}
	if (typeof expObject === 'string') return { value: expObject, type: VTL };

	console.warn(`Non-VTL compatible expression`);
	console.warn(expObject);
	throw new Error(`Uncompatible VTL typeof element : ${typeof expObject}`);
}

/**
 * Extract values for every variables
 */
function createBindings(variables: LunaticState['variables']): Bindings {
	return Object.entries(variables).reduce(function (
		bindings,
		[name, { value }]
	) {
		return { ...bindings, [name]: value };
	},
	{});
}

/**
 * Generates methods to interact with variables
 */
function createExecuteExpression(
	variables: LunaticState['variables'],
	features: string[]
) {
	// on aimerait map d'expression, avec les bindings
	const bindings = createBindings(variables);
	const tokensMap = new Map<LunaticExpression | string, string[]>();
	const [memoize, getMemoizedValue] = createMemoizer();
	const [refreshCalculated, setToRefreshCalculated] = createRefreshCalculated({
		variables,
		execute,
		bindings,
	});

	/**
	 * Mark all linked variables to be refreshed
	 */
	function pushToLazy(name: string) {
		if (name in variables) {
			const { CalculatedLinked = [] } = variables[name];
			CalculatedLinked.forEach(function (variable) {
				const { name } = variable;
				setToRefreshCalculated(name, variable);
			});
		} else {
			console.warn(`${name} is not identified as varaible!`);
		}
	}

	/**
	 * Update the value of a variable
	 */
	function updateBindings(name: string, value: unknown) {
		if (name in bindings) {
			bindings[name] = value;
		}
		pushToLazy(name);
	}

	/**
	 * Extract variables from an expression
	 */
	function getVariablesAndCatch(expression: string | LunaticExpression) {
		// If we have an expression we can't have tokens
		if (typeof expression !== 'string') {
			return [];
		}
		if (tokensMap.has(expression)) {
			return tokensMap.get(expression);
		}
		const tokens = getExpressionVariables(expression, variables);
		tokensMap.set(expression, tokens);
		return tokens;
	}

	/**
	 * Retrieve variable affected by the dependencies
	 */
	function collecteVariables(dependencies: unknown): {
		[name: string]: LunaticState['variables'];
	} {
		if (Array.isArray(dependencies)) {
			return dependencies.reduce(function (map, name) {
				if (name in variables) {
					const data = variables[name];
					const { variable } = data;
					if (!(name in map)) {
						if (variable.variableType === 'CALCULATED') {
							const { expression } = variable;
							const subDependencies = getVariablesAndCatch(expression);

							return {
								...map,
								[name]: { ...variable },
								...collecteVariables(subDependencies),
							};
						}

						return { ...map, [name]: { ...variable } };
					}
				} else {
					throw new Error(`Unknown variable ${name}`);
				}
				return map;
			}, {});
		}
		return {};
	}

	function resolveUseContext(
		name: string,
		{
			iteration,
			linksIterations,
		}: { iteration?: number; linksIterations?: number[] }
	) {
		const value = bindings[name];

		if ([X_AXIS, Y_AXIS].includes(name) && linksIterations !== undefined) {
			pushToLazy(name);
			const [x, y] = linksIterations;
			if (Array.isArray(value) && x < value.length) {
				return value[name === X_AXIS ? x : y];
			}
			return null;
		}
		if (iteration !== undefined && Array.isArray(value)) {
			pushToLazy(name);
			if (iteration < value.length) {
				return value[iteration];
			}
			return null;
		}
		if (linksIterations !== undefined) {
			const [x, y] = linksIterations;
			if (Array.isArray(value) && x < value.length) {
				const sub = value[x];
				if (Array.isArray(sub) && y < sub.length) {
					return sub[y];
				}
			}

			return null;
		}
		return getVTLCompatibleValue(value);
	}

	function fillVariablesValues(
		map: { [variableName: string]: unknown },
		{
			iteration,
			linksIterations,
		}: { iteration?: number; linksIterations?: number[] }
	) {
		return Object.entries(map).reduce(function (sub, [name, _]) {
			return {
				...sub,
				[name]: resolveUseContext(name, { iteration, linksIterations }),
			};
		}, {});
	}

	function execute<T = unknown>(
		expObject: unknown, // VtlExpression
		args: Parameters<LunaticState['executeExpression']>[1] = {}
	): T {
		const { value: expression, type } = validateExpression(
			getSafetyExpression(expObject)
		);
		const { iteration, linksIterations, logging } = args;
		const bindingDependencies = getVariablesAndCatch(expression);

		function loggingDefault(_: unknown, bindings: Bindings, e: unknown) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(`VTL error :  ${expression}`, { ...args }, { bindings });
				console.warn(e);
			}
		}

		const vtlBindings = refreshCalculated(
			fillVariablesValues(collecteVariables(bindingDependencies), {
				iteration,
				linksIterations,
			}),
			{ rootExpression: expression, iteration, linksIterations }
		);
		// Add index has a specific variable
		vtlBindings['GLOBAL_ITERATION_INDEX'] = (
			(args?.iteration ?? 0) + 1
		).toString();
		const memoized = getMemoizedValue(expression, vtlBindings);
		if (memoized === undefined) {
			const result = executeExpression(
				vtlBindings,
				expression,
				type,
				features,
				logging || loggingDefault
			);
			memoize(expression, vtlBindings, result);

			return result as T; // We need to force this type to match with the signature
		}
		return memoized;
	}

	return [execute, updateBindings] as const;
}

export default createExecuteExpression;
