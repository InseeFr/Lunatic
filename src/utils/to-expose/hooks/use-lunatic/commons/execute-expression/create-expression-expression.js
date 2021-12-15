import executeExpression from './execute-expression';

function createBindings(variables) {
	return Object.entries(variables).reduce(function (map, [name, { value }]) {
		return { ...map, [name]: value };
	}, {});
}

function createExecuteExpression(variables, features) {
	const bindings = createBindings(variables);
	const vtlBindings = { ...bindings };
	const toRefreshVariables = new Map();
	/**
	 *
	 * @param {*} name
	 * @param {*} value
	 */
	function updateBindings(name, value) {
		if (name in vtlBindings) {
			bindings[name] = value;
			vtlBindings[name] = value;
		}

		const { dependencies } = variables[name];
		console.log({ dependencies });
	}

	/**
	 *
	 * @param {*} expression
	 * @param {*} feature
	 * @param {*} param2
	 * @returns
	 */
	function execute(expression, { varaiblesRebinded, vectorials } = {}) {
		const result = executeExpression(vtlBindings, expression, features);

		return result;
	}

	return [execute, updateBindings];
}

export default createExecuteExpression;
