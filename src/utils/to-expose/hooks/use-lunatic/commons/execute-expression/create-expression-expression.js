import executeExpression from './execute-expression';

function createBindings(variables) {
	return Object.entries(variables).reduce(function (map, [name, { value }]) {
		return { ...map, [name]: value };
	}, {});
}

function createExecuteExpression(variables, bindingDependencies, features) {
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
		if (name in bindingDependencies) {
			console.log(bindingDependencies[name]);
			// TODO
		}
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
