function isLoop(component) {
	const { componentType, paginatedLoop } = component;
	return componentType === 'Loop' && paginatedLoop;
}

function filterLoopComponents(components, bindings) {
	return components.reduce(function (next, component) {
		if (isLoop(component)) {
		}
		return [...next, component];
	}, []);
}

export default filterLoopComponents;
