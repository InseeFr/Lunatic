import executeExpression from './execute-expression';

function getVtlCompatibleValue(name, value) {
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
				{ ...vtlBindings, [name]: getVtlCompatibleValue(name, value) },
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
			vtlBindings[name] = getVtlCompatibleValue(name, value);
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
	function refreshCalculated(dependencies) {
		dependencies.forEach(function (name) {
			if (name in variables) {
				const { variable } = variables[name];

				const { variableType, expression } = variable;
				if (variableType === 'CALCULATED' && toRefreshVariables.has(name)) {
					const value = executeExpression(vtlBindings, expression, ['VTL']);
					updateBindings(name, value);
					toRefreshVariables.delete(name);
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
	function execute(expression, { bindingDependencies } = {}) {
		if (Array.isArray(bindingDependencies)) {
			refreshCalculated(bindingDependencies);
		}
		return executeExpression(vtlBindings, expression, features);
	}
	return [execute, updateBindings];
}

export default createExecuteExpression;
