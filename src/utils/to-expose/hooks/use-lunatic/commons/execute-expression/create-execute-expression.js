import executeExpression from './execute-expression';

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
 * @param {*} features
 * @returns
 */
function createExecuteExpression(variables, features) {
	// on aimerait map d'expression, avec les bindings
	const bindings = createBindings(variables);
	const expressionsMap = new Map();
	const toRefreshVariables = new Map(); // variables calculées dépendantes d'une variable modifiée.
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
		}
		// enrichissement des variables à rafraîchir
		const { CalculatedLinked = [] } = variables[name];

		CalculatedLinked.forEach(function (variable) {
			const { name } = variable;
			toRefreshVariables.set(name, variable);
		});
	}

	/**/

	function collecteVariables(dependencies, variables) {
		if (Array.isArray(dependencies)) {
			return dependencies.reduce(function (map, name) {
				const data = variables[name];
				const { variable, type } = data;
				if (!(name in map)) {
					if (type === 'CALCULATED') {
						const { bindingDependencies: subDependencies } = variable;
						return {
							...map,
							[name]: { ...variable },
							...collecteVariables(subDependencies, variables),
						};
					}

					return { ...map, [name]: { ...variable } };
				}
				return map;
			}, {});
		}
		return {};
	}

	function resolveUseContext(name, { bindings, iteration }) {
		const value = bindings[name];
		if (iteration !== undefined && Array.isArray(value)) {
			return value[iteration];
		}
		return getVtlCompatibleValue(value);
	}

	function refreshCalculated(map, { variables, bindings, features }) {
		return Object.entries(map).reduce(function (sub, [name, current]) {
			const { variable, type } = variables[name];

			if (type === 'CALCULATED' && toRefreshVariables.has(name)) {
				const { expression } = variable;
				const value = executeExpression(map, expression, features);
				bindings[name] = value;
				toRefreshVariables.delete(name);

				return { ...sub, [name]: value };
			}
			return { ...sub, [name]: current };
		}, {});
	}

	function fillVariablesValues(map, { bindings, iteration }) {
		return Object.entries(map).reduce(function (sub, [name, _]) {
			return {
				...sub,
				[name]: resolveUseContext(name, { bindings, iteration }),
			};
		}, {});
	}

	/*	*/

	function directExecute(expression, args) {
		const { bindingDependencies, iteration } = args;

		function logging(_, e) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(`VTL error :  ${expression}`, args);
				console.warn(e);
			}
		}

		const map = refreshCalculated(
			fillVariablesValues(collecteVariables(bindingDependencies, variables), {
				bindings,
				iteration,
				variables,
			}),
			{ variables, bindings, features }
		);
		const result = executeExpression(map, expression, features, logging);

		return result;
	}

	/**
	 *
	 * @param {*} expression
	 * @param {*} feature
	 * @param {*} param2
	 * @returns
	 */
	function execute(expression, args = {}) {
		const { bindingDependencies } = args;
		if (expressionsMap.has(expression)) {
			return expressionsMap.get(expression);
		}
		const value = directExecute(expression, args);
		if (!bindingDependencies) {
			expressionsMap.set(expression, value);
		}

		return value;
	}

	return [execute, updateBindings];
}

export default createExecuteExpression;
