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
	return Object.entries(variables).reduce(
		function ([bindings, vtlBindings], [name, { value }]) {
			return [
				{ ...bindings, [name]: value },
				{ ...vtlBindings, [name]: getVtlCompatibleValue(value) },
			];
		},
		[{}, {}]
	);
}

/**
 *
 * @param {*} variables
 * @param {*} features
 * @returns
 */
function createExecuteExpression(variables, features) {
	// on aimerait map d'expression, avec les bindings
	const [bindings, vtlBindings] = createBindings(variables);
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
		if (name in vtlBindings) {
			bindings[name] = value;
			vtlBindings[name] = getVtlCompatibleValue(value);
		}
		// enrichissement des variables à rafraîchir
		const { dependencies } = variables[name];
		if (dependencies) {
			dependencies.forEach(function (variable) {
				const { name, variableType } = variable;
				if (variableType === 'CALCULATED') {
					toRefreshVariables.set(name, variable);
				}
			});
		}
	}

	/**
	 *
	 * @param {*} dependencies
	 */
	// function refreshCalculated(dependencies, iteration) {
	// 	dependencies.forEach(function (name) {
	// 		if (name in variables) {
	// 			const { variable } = variables[name];
	// 			const { variableType, expression, bindingDependencies } = variable;

	// 			if (variableType === 'CALCULATED' && toRefreshVariables.has(name)) {
	// 				toRefreshVariables.delete(name);
	// 				if (bindingDependencies) {
	// 					refreshCalculated(bindingDependencies, iteration);
	// 				}
	// 				const value = executeExpression(vtlBindings, expression, features); //execute(expression, { bindingDependencies, iteration });
	// 				updateBindings(name, value);
	// 			}
	// 		}
	// 	});
	// }

	function renewArray(dependencies = []) {
		dependencies.forEach(function (name) {
			if (name in variables) {
				const value = bindings[name];
				vtlBindings[name] = getVtlCompatibleValue(value);
			}
		});
	}

	function refreshArrayVariablesForLoop(dependencies, iteration) {
		dependencies.forEach(function (name) {
			if (name in variables) {
				const value = bindings[name];
				if (Array.isArray(value)) {
					const { length } = value;
					if (iteration < length) {
						vtlBindings[name] = value[iteration];
					} else {
						vtlBindings[name] = '';
					}
				}
			}
		});
	}

	function refreshCalculatedInLoop(bindingDependencies, iteration) {
		bindingDependencies.forEach(function (name) {
			const { variable } = variables[name];
			const { variableType } = variable;
			if (variableType === 'CALCULATED' && toRefreshVariables.has(name)) {
				const { bindingDependencies: dependencies, expression } = variable;
				refreshArrayVariablesForLoop(dependencies, iteration);
				const value = executeExpression(vtlBindings, expression, features);
				toRefreshVariables.set(name, variable);
				updateBindings(name, value);
			}
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
		// return Object.entries(map).reduce(function (sub, [name, _]) {
		// 	const { variable, type } = variables[name];
		// 	if (type === 'CALCULTED') {
		// 		const { expression } = variable;
		// 		const value = executeExpression(bindings, expression, features);
		// 		return { ...sub, [name]: value };
		// 	}
		// 	return sub;
		// }, map);
		return map;
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

		// console.log({ expression, map, vtlBindings, iteration });

		// if (iteration !== undefined) {
		// 	refreshCalculatedInLoop(bindingDependencies, iteration);
		// 	refreshArrayVariablesForLoop(bindingDependencies, iteration);
		// } else if (bindingDependencies) {
		// 	refreshCalculated(bindingDependencies);
		// }

		const result = executeExpression(map, expression, features, logging);
		// renewArray(bindingDependencies);

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
		// console.log({ expression, ...args });
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
