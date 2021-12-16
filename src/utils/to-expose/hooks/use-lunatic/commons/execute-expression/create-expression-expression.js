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

function createExecuteExpression(variables, features) {
	const [bindings, vtlBindings] = createBindings(variables);

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
	function refreshCalculated(dependencies = []) {
		dependencies.forEach(function (name) {
			if (name in variables) {
				const { variable } = variables[name];

				const { variableType, expression, bindingDependencies } = variable;
				if (variableType === 'CALCULATED' && toRefreshVariables.has(name)) {
					if (bindingDependencies) {
						refreshCalculated(bindingDependencies);
					}
					const value = executeExpression(vtlBindings, expression, ['VTL']);
					updateBindings(name, value);
					toRefreshVariables.delete(name);
				}
			}
		});
	}

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
					vtlBindings[name] = value[iteration];
				}
			}
		});
	}

	/**
	 *
	 * @param {*} expression
	 * @param {*} feature
	 * @param {*} param2
	 * @returns
	 */
	function execute(expression, args = {}) {
		const { bindingDependencies, iteration } = args;

		refreshCalculated(bindingDependencies);
		if (Array.isArray(bindingDependencies) && iteration !== undefined) {
			refreshArrayVariablesForLoop(bindingDependencies, iteration); // WTF
			refreshCalculated(bindingDependencies);
		}

		const result = executeExpression(vtlBindings, expression, features);
		renewArray(bindingDependencies); // WTF
		return result;
	}
	return [execute, updateBindings];
}

export default createExecuteExpression;
