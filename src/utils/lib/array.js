export const buildNullNestedArray = (array) => {
	if (!Array.isArray(array)) return [];
	return array.map((a) => {
		if (Array.isArray(a)) return buildNullNestedArray(a);
		return null;
	});
};
