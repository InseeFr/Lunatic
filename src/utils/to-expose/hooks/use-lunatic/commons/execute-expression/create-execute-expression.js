import executeExpression from './execute-expression';
import createExpressionsMap from './create-expressions-map';

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

function createUpdateExpressions(expressionsMap) {
	const already = [];
	return function appendExpression(components, { page, subPage }) {
		const expressions = createExpressionsMap(components);
		const tag = subPage !== undefined ? `${page}-${subPage}` : page;
		if (already.indexOf(tag) === -1) {
			already.push(tag);
			Object.entries(expressions).forEach(function ([expression, data]) {
				if (!expressionsMap.has(expression)) {
					expressionsMap.set(expression, data);
				}
			});
		}
	};
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
	function refreshCalculated(dependencies, iteration) {
		dependencies.forEach(function (name) {
			if (name in variables) {
				const { variable } = variables[name];
				const { variableType, expression, bindingDependencies } = variable;

				if (variableType === 'CALCULATED' && toRefreshVariables.has(name)) {
					toRefreshVariables.delete(name);
					if (bindingDependencies) {
						refreshCalculated(bindingDependencies, iteration);
					}
					const value = executeExpression(vtlBindings, expression, features); //execute(expression, { bindingDependencies, iteration });
					updateBindings(name, value);
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

	function refreshCalculatedInLoop(bindingDependencies, iteration) {
		// console.log({ bindingDependencies, iteration });
	}

	const appendExpressions = createUpdateExpressions(expressionsMap);

	function directExecute(expression, args) {
		const { bindingDependencies, iteration } = args;
		if (Array.isArray(bindingDependencies) && iteration !== undefined) {
			refreshCalculatedInLoop(bindingDependencies, iteration);
			refreshArrayVariablesForLoop(bindingDependencies, iteration);
		} else if (bindingDependencies) {
			refreshCalculated(bindingDependencies);
		}

		const result = executeExpression(vtlBindings, expression, features);
		renewArray(bindingDependencies);

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
		if (!expressionsMap.has(expression)) {
			console.warn('expression inconnue', expression, args);
			return directExecute(expression, args);
		}
		const data = expressionsMap.get(expression);
		const { result, bindingDependencies } = data;
		if (result) {
			return result;
		}
		const result_ = directExecute(expression, { ...args, bindingDependencies });
		if (!bindingDependencies) {
			expressionsMap.set(expression, { ...data, result: result_ });
		}

		return result_;
	}

	return [execute, updateBindings, appendExpressions];
}

export default createExecuteExpression;
