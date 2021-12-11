function isCollectedComponent(component) {
	const { response } = component;
	return response !== undefined;
}

function isLoopComponent(component) {
	const { componentType, lines } = component;
	if (componentType === 'Loop' && typeof lines === 'object') {
		const { min, max } = lines;
		if (Number.isInteger(min) && Number.isInteger(max) && min <= max) {
			return true;
		}
	}
	return false;
}

function getCollectedValue(component, variables) {
	const { response } = component;
	const { name } = response;
	if (name in variables) {
		const { value } = variables[name];
		return value;
	}

	return undefined;
}

function getLoopValues(component, variables) {
	const { components } = component;
	return components.reduce(function (map, component) {
		const { response } = component;
		const { name } = response;
		if (name) {
			return { ...map, [name]: getCollectedValue(component, variables) };
		}

		return map;
	}, {});
}

function getComponentValue(component, variables) {
	if (isCollectedComponent(component)) {
		return getCollectedValue(component, variables);
	}
	if (isLoopComponent(component)) {
		return getLoopValues(component, variables);
	}
	return undefined;
}

export default getComponentValue;
