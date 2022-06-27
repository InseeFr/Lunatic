import executeExpression from './execute-expression';
import getSafetyExpression from './get-safety-expression';
import getExpressionVariables from './get-expressions-variables';
import createMemoizer from './create-memoizer';
import createRefreshCalculated from './create-refresh-calculated';
import getVtlCompatibleValue from 'utils/vtl';
import { VTL, VTL_MD, X_AXIS, Y_AXIS } from 'utils/constants';

function validateExpression(expObject) {
	if (typeof expObject === 'object') {
		const { type } = expObject;
		if (type === VTL || type === VTL_MD) {
			return expObject;
		}
	}
	throw new Error(`Non-VTL compatible expression : ${expObject}`);
}

function createBindings(variables) {
	return Object.entries(variables).reduce(function (
		bindings,
		[name, { value }]
	) {
		return { ...bindings, [name]: value };
	},
	{});
}

/**
 *
 * @param {*} variables
 * @returns
 */
function createExecuteExpression(variables, features) {
	// on aimerait map d'expression, avec les bindings
	const bindings = createBindings(variables);
	const tokensMap = new Map();
	const collectedUpdated = new Map();
	const [memoize, getMemoizedValue] = createMemoizer();
	const [refreshCalculated, setToRefreshCalculated] = createRefreshCalculated({
		variables,
		execute,
		bindings,
	});

	/**
	 *
	 * @param {*} name
	 */
	function pushToLazy(name) {
		const { CalculatedLinked = [] } = variables[name];

		CalculatedLinked.forEach(function (variable) {
			const { name } = variable;
			setToRefreshCalculated(name, variable);
		});
	}

	/**
	 *
	 * @param {*} name
	 * @param {*} value
	 */
	function updateBindings(name, value) {
		// update des bindings
		if (name in bindings) {
			bindings[name] = value;
			collectedUpdated.set(name, []);
		}
		pushToLazy(name);
	}

	function getVariablesAndCach(expression) {
		if (tokensMap.has(expression)) {
			return tokensMap.get(expression);
		}
		const tokens = getExpressionVariables(expression, variables);
		tokensMap.set(expression, tokens);
		return tokens;
	}

	/**/
	function collecteVariables(dependencies) {
		if (Array.isArray(dependencies)) {
			return dependencies.reduce(function (map, name) {
				if (name in variables) {
					const data = variables[name];
					const { variable, type } = data;
					if (!(name in map)) {
						if (type === 'CALCULATED') {
							const { expression } = variable;
							const subDependencies = getVariablesAndCach(expression);

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

	function resolveUseContext(name, { iteration, linksIterations }) {
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
		return getVtlCompatibleValue(value);
	}

	function fillVariablesValues(map, { iteration, linksIterations }) {
		return Object.entries(map).reduce(function (sub, [name, _]) {
			return {
				...sub,
				[name]: resolveUseContext(name, { iteration, linksIterations }),
			};
		}, {});
	}

	/**
	 *
	 * @param {*} vtlObject
	 * @param {*} args
	 * @returns
	 */
	function execute(expObject, args = {}) {
		const { value: expression, type } = validateExpression(
			getSafetyExpression(expObject)
		);
		const { iteration, linksIterations, logging } = args;
		const bindingDependencies = getVariablesAndCach(expression);

		function loggingDefault(_, bindings, e) {
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

			return result;
		}
		return memoized;
	}

	return [execute, updateBindings];
}

export default createExecuteExpression;
