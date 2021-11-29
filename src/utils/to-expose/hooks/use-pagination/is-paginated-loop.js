function isPaginatedLoop(component) {
	const { componentType, paginatedLoop } = component;
	return componentType === 'Loop' && paginatedLoop;
}

export default isPaginatedLoop;
