/**
 * Generates lunatic shaped data from an object
 */
export function objectToData(obj) {
	const items = Object.entries(obj).map(([key, value]) => {
		return [key, { COLLECTED: value }];
	});
	return {
		COLLECTED: Object.fromEntries(items),
	};
}
