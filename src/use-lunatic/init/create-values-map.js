function createValuesMap(source) {
	const { variables } = source;
	if (typeof variables === 'object') {
		return Object.entries(variables).reduce(function (map, [name, variable]) {
			const { type, values = {} } = variable;
			if (type === 'COLLECTED') {
				const { PREVIOUS, COLLECTED, FORCED } = values;
				return { ...map, [name]: PREVIOUS || COLLECTED || FORCED || null };
			}
			return map;
		}, {});
	}
	return {};
}

export default createValuesMap;
