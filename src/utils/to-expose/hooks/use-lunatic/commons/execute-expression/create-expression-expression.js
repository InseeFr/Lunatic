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
				const { name } = variable;
				toRefreshVariables.set(name, variable);
			});
		}
	}

	/**
	 *
	 * @param {*} expression
	 * @param {*} feature
	 * @param {*} param2
	 * @returns
	 */
	function execute(expression, { dependencies } = {}) {
		const result = executeExpression(vtlBindings, expression, features);

		return result;
	}

	return [execute, updateBindings];
}

export default createExecuteExpression;
