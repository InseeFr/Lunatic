import executeExpression from './execute-expression';
import { interpret } from '@inseefr/trevas';

//const res = interpret(expression, bindings);

function createBindings(variables) {
	return Object.entries(variables).reduce(function (map, [name, { value }]) {
		return { ...map, [name]: value };
	}, {});
}

function createExecuteExpression(variables) {
	const bindings = createBindings(variables);
	const vtlBindings = { ...bindings };
	function updateBindings(name, value) {
		if (name in vtlBindings) {
			bindings[name] = value;
			vtlBindings[name] = value;
		}
	}

	// je met async : tout cela pourrait bouget dans un WW
	async function execute(
		expression,
		feature /* VTL, MD */,
		{ rebinds, vectorials }
	) {
		// options peut contenir les index de certaines variables tableaux
		// TODO implémenter rebinds
		const result = executeExpression(vtlBindings, expression, feature);

		return result;
	}

	return [execute, updateBindings];
}

export default createExecuteExpression;
