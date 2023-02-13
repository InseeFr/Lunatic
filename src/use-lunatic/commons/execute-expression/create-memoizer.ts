import objectHash from 'object-hash';

type Bindings = { [variableName: string]: unknown };

/**
 * To avoid performance issue when recalculating expression, memoise the value for every expression, binding combo
 */
function createMemoizer() {
	const expresionsMap = new Map();

	function refillBindings(bindings: Bindings) {
		return Object.entries(bindings).reduce(function (map, [key, value]) {
			if (value && typeof value === 'object' && 'result' in value) {
				return { ...map, [key]: value.result };
			}
			return { ...map, [key]: value };
		}, {});
	}

	// Save the value in the map
	function memoize(expression: string, bindings: Bindings, value: unknown) {
		const refill = refillBindings(bindings);
		const hash = objectHash(refill);
		let map = expresionsMap.get(expression);

		if (!map) {
			map = new Map();
			expresionsMap.set(expression, map);
		}
		map.set(hash, value);
	}

	// Retrieve the value from the map (or undefined if it doesn't exist)
	function getMemoizedValue(expression: string, bindings: Bindings) {
		let map = expresionsMap.get(expression);

		if (map) {
			const refill = refillBindings(bindings);
			const hash = objectHash(refill);
			return map.get(hash);
		}
		return undefined;
	}

	return [memoize, getMemoizedValue] as const;
}

export default createMemoizer;
