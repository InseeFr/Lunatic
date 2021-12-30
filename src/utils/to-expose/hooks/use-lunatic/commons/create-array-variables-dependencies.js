function mergeToMap(name, bindings, map) {
	if (name in map) {
		const current = map[name];
		const next = bindings.reduce(
			function (a, bind) {
				if (current.indexOf(bind === -1)) {
					return [...a, bind];
				}
				return a;
			},
			[...current]
		);

		return { ...map, [name]: next };
	}
	return { ...map, [name]: [...bindings] };
}

function checkComponents(components, arrayVD = {}) {
	return components.reduce(
		function (map, component) {
			const { loopDependencies, bindingDependencies, paginatedLoop } =
				component;
			if (loopDependencies && !paginatedLoop) {
				const [name] = loopDependencies;
				return mergeToMap(name, bindingDependencies, map);
			}
			return map;
		},
		{ ...arrayVD }
	);
}

function createArrayVariablesDependencies(source) {
	if (typeof source === 'object') {
		const { components = [] } = source;
		return checkComponents(components);
	}
	return {};
}

export default createArrayVariablesDependencies;
