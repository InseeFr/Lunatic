function isCollectedComponent(component) {
	const { response } = component;
	return response !== undefined;
}

function isCheckboxGroup(component) {
	const { componentType } = component;
	return componentType === 'CheckboxGroup';
}

function isLoopComponent(component) {
	const { componentType, lines, iterations } = component;
	if (componentType === 'Loop' && iterations !== undefined) {
		return true;
	}
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

function getCollectedValue(response, variables) {
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
				return { ...map, [name]: getCollectedValue(response, variables) };
			}
		}
		return map;
	}, {});
}

function getCheckboxGroupValue(component, variables) {
	const { responses } = component;
	if (typeof responses === 'object') {
		return responses.reduce(function (map, entry) {
			const { response } = entry;
			if (entry) {
				const { name } = response;
				return { ...map, [name]: getCollectedValue(response, variables) };
			}
			return map;
		}, {});
	}
	return {};
}

function getSubPageValue(state, component, variables) {
	const { response } = component;
	const value = getCollectedValue(response, variables);

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
	if (isCheckboxGroup(component)) {
		return getCheckboxGroupValue(component, variables);
	}
	if (isLoopComponent(component)) {
		return getLoopValues(component, variables);
	}
	if (isInSubPage(state)) {
		return getSubPageValue(state, component, variables);
	}
	if (isCollectedComponent(component)) {
		const { response } = component;
		return getCollectedValue(response, variables);
	}

	return undefined;
}

export default getComponentValue;
