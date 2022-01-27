import objectHash from 'object-hash';

function createMemoizer() {
	const expresionsMap = new Map();

	function refillBindings(bindings) {
		return Object.entries(bindings).reduce(function (map, [key, value]) {
			const dataPointsValue = value?.result;
			if (dataPointsValue) {
				return { ...map, [key]: dataPointsValue };
			}
			return { ...map, [key]: value };
		}, {});
	}

	function memoize(expression, bindings, value) {
		const refill = refillBindings(bindings);
		const hash = objectHash(refill);
		let map = expresionsMap.get(expression);

		if (!map) {
			map = new Map();
			expresionsMap.set(expression, map);
		}
		map.set(hash, value);
	}

	function getMemoizedValue(expression, bindings) {
		let map = expresionsMap.get(expression);
		if (map) {
			const refill = refillBindings(bindings);
			const hash = objectHash(refill);

			return map.get(hash);
		}
		return undefined;
	}

	return [memoize, getMemoizedValue];
}

export default createMemoizer;
