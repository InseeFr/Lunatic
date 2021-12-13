import executeExpression from './execute-expression';

/**
 * Map contenant les expression déjà exécutées.
 */
const MAP_UNEXECUTABLE = new Map();

function createExecuteExpression(vtlBindings) {
	const bindings = { ...vtlBindings };

	function updateBindings(name, value) {
		if (name in vtlBindings) {
			vtlBindings[name] = value;
			bindings[name] = value;
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
		const result = executeExpression(bindings, expression, feature);

		return result;
	}

	return [execute, updateBindings];
}

export default createExecuteExpression;
