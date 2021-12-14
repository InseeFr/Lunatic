function isCollectedComponent(component) {
	const { response } = component;
	return response !== undefined;
}

function isLoopComponent(component) {
	const { componentType, lines } = component;
	if (
		componentType === 'Loop' &&
		typeof lines === 'object' &&
		lines.max !== undefined &&
		lines.min !== undefined
	) {
		return true;
	}
	return false;
}
function isInSubPage(state) {
	const { pager } = state;
	const { subPage } = pager;

	return subPage !== undefined;
}

function getCollectedValue(component, variables) {
	const { response } = component;
	if (response) {
		const { name } = response;
		if (name in variables) {
			const { value } = variables[name];
			return value;
		}
	}

	return undefined;
}

function getLoopValues(component, variables) {
	const { components } = component;
	return components.reduce(function (map, component) {
		// TODO responses cells
		const { response } = component;
		if (response) {
			const { name } = response;
			if (name) {
				return { ...map, [name]: getCollectedValue(component, variables) };
			}
		}
		return map;
	}, {});
}

function getSubPageValue(state, component, variables) {
	const value = getCollectedValue(component, variables);

	if (value && Array.isArray(value)) {
		const { pager } = state;
		const { iteration } = pager;
		return value[iteration];
	}
	return undefined;
}

function getComponentValue(component, state) {
	const { variables } = state;
	// l'ordre est important : à écrire mieux.
	if (isLoopComponent(component)) {
		return getLoopValues(component, variables);
	}
	if (isInSubPage(state)) {
		return getSubPageValue(state, component, variables);
	}
	if (isCollectedComponent(component)) {
		return getCollectedValue(component, variables);
	}

	return undefined;
}

export default getComponentValue;
