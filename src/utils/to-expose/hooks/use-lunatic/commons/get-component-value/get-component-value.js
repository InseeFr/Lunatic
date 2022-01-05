// function isCheckboxGroup(component) {
// 	const { componentType } = component;
// 	return componentType === 'CheckboxGroup';
// }

// function isLoopComponent(component) {
// 	const { componentType, lines, iterations } = component;
// 	if (componentType === 'Loop' && iterations !== undefined) {
// 		return true;
// 	}
// 	if (
// 		componentType === 'Loop' &&
// 		typeof lines === 'object' &&
// 		lines.max !== undefined &&
// 		lines.min !== undefined
// 	) {
// 		return true;
// 	}
// 	return false;
// }

function isInSubPage(state) {
	const { pager } = state;
	const { subPage } = pager;

	return subPage !== undefined;
}

// function getLoopValues(component, variables) {
// 	const { components } = component;
// 	return components.reduce(function (map, component) {
// 		// TODO responses cells
// 		const { response } = component;
// 		if (response) {
// 			const { name } = response;
// 			if (name) {
// 				return { ...map, [name]: getCollectedValue(component, variables) };
// 			}
// 		}
// 		return map;
// 	}, {});
// }

// function getCheckboxGroupValue(component, variables) {
// 	const { responses } = component;
// 	if (typeof responses === 'object') {
// 		return responses.reduce(function (map, entry) {
// 			const { response } = entry;
// 			if (entry) {
// 				const { name } = response;
// 				return { ...map, [name]: getCollectedValue({ response }, variables) };
// 			}
// 			return map;
// 		}, {});
// 	}
// 	return {};
// }

// function getCollectedValue(component, variables) {
// 	const { response } = component;

// 	if (response) {
// 		const { name } = response;
// 		if (name in variables) {
// 			const { value } = variables[name];
// 			return value;
// 		}
// 	}

// 	return undefined;
// }

// function getSubPageValue(state, component, variables) {
// 	const value = getCollectedValue(component, variables);

// 	if (value && Array.isArray(value)) {
// 		const { pager } = state;
// 		const { iteration } = pager;
// 		return value[iteration];
// 	}
// 	return undefined;
// }

/* */
function mergeResponse({ map, response, variables }) {
	const { name } = response;
	if (name in variables) {
		return { ...map, [name]: variables[name].value };
	}
	return map;
}

function collecteArrayResponses({ components, variables, map = {} }) {
	return components.reduce(function (sub, component) {
		return collecteComponentResponse({
			component,
			variables,
			map: sub,
		});
	}, map);
}

function collecteComponentResponse({ component, variables, map = {} }) {
	const { components, response, responses } = component;
	if (response) {
		return mergeResponse({ map, response, variables });
	}
	if (components) {
		return collecteArrayResponses({ components, variables, map });
	}
	if (responses) {
		return collecteArrayResponses({ components: responses, variables, map });
	}
	return map;
}

/* */

function checkArrayForSubPage(map, state) {
	const { pager } = state;
	const { iteration } = pager;
	return Object.entries(map).reduce(function (sub, [name, value]) {
		if (value && Array.isArray(value)) {
			return { ...sub, [name]: value[iteration] };
		}
		return { ...sub, [name]: value };
	}, {});
}

function checkUseContext(map, state) {
	if (isInSubPage(state)) {
		return checkArrayForSubPage(map, state);
	}
	return map;
}

function isSimpleComponent(component) {
	const { response } = component;
	return typeof response === 'object';
}

/* */

function getComponentValue(component, state) {
	const { variables } = state;
	/* */

	const map = checkUseContext(
		collecteComponentResponse({ component, variables }),
		state
	);

	if (isSimpleComponent(component)) {
		const { response } = component;
		const { name } = response;

		return map[name];
	}
	return map;
	/* */
	// l'ordre est important : à écrire mieux.
	// if (isLoopComponent(component)) {
	// 	return getLoopValues(component, variables);
	// }
	// if (isInSubPage(state)) {
	// 	return getSubPageValue(state, component, variables);
	// }
	// if (isCheckboxGroup(component)) {
	// 	return getCheckboxGroupValue(component, variables);
	// }

	// return getCollectedValue(component, variables);
}

export default getComponentValue;
