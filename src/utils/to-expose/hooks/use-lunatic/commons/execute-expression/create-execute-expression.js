import executeExpression from './execute-expression';
import getExpressionVariables from './get-expressions-variables';

function getVtlCompatibleValue(value) {
	if (value === undefined) {
		return null;
	}
	if (Array.isArray(value)) {
		return {
			dataStructure: { result: {} },
			dataPoints: {
				result: value,
			},
		};
	}

	return value;
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
	const toRefreshVariables = new Map(); // variables calculées dépendantes d'une variable modifiée.
	const collectedUpdated = new Map();
	// à l'init, on y colle toutes les variables de calcul
	Object.values(variables).forEach(function ({ variable }) {
		const { variableType, name } = variable;
		if (variableType === 'CALCULATED') {
			toRefreshVariables.set(name, variable);
		}
	});
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
		// enrichissement des variables à rafraîchir
		const { CalculatedLinked = [] } = variables[name];

		CalculatedLinked.forEach(function (variable) {
			const { name } = variable;
			toRefreshVariables.set(name, variable);
		});
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
					throw new Error(`Unknow variable ${name}`);
				}
				return map;
			}, {});
		}
		return {};
	}

	function resolveUseContext(name, { iteration }) {
		const value = bindings[name];
		if (iteration !== undefined && Array.isArray(value)) {
			return value[iteration] || null;
		}
		return getVtlCompatibleValue(value);
	}

	function refreshCalculated(map, { rootExpression, iteration }) {
		return Object.entries(map).reduce(function (sub, [name, current]) {
			const { variable, type } = variables[name];

			if (type === 'CALCULATED' && toRefreshVariables.has(name)) {
				const { expression, shapeFrom } = variable;

				function logging(expression, bindings, e) {
					if (process.env.NODE_ENV === 'development') {
						console.warn(
							`VTL error when refreshing calculated variable ${name} :  ${expression}`,
							{ bindings }
						);
						console.warn(`root expression : ${rootExpression}`);
						console.warn(e);
					}
				}

				const value = directExecute(expression, {
					logging,
					iteration: shapeFrom ? iteration : undefined,
				});
				bindings[name] = value;
				toRefreshVariables.delete(name);

				return { ...sub, [name]: value };
			}
			return { ...sub, [name]: current };
		}, {});
	}

	function fillVariablesValues(map, { iteration }) {
		return Object.entries(map).reduce(function (sub, [name, _]) {
			return {
				...sub,
				[name]: resolveUseContext(name, { iteration }),
			};
		}, {});
	}

	/*	*/

	function directExecute(expression, args) {
		const { iteration, logging } = args;
		const bindingDependencies = getVariablesAndCach(expression);

		function loggingDefault(_, bindings, e) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(`VTL error :  ${expression}`, { ...args }, { bindings });
				console.warn(e);
			}
		}

		const map = refreshCalculated(
			fillVariablesValues(collecteVariables(bindingDependencies), {
				iteration,
			}),
			{ rootExpression: expression, iteration }
		);
		const result = executeExpression(
			map,
			expression,
			features,
			logging || loggingDefault
		);

		return result;
	}

	/**
	 * args = { iteration, logging }
	 * @param {*} expression
	 * @param {*} agrs
	 * @returns
	 */
	function execute(expression, args = {}) {
		const value = directExecute(expression, args);

		return value;
	}

	return [execute, updateBindings];
}

export default createExecuteExpression;
