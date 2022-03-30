function isInSubPage(state) {
	const { pager } = state;
	const { subPage } = pager;

	return subPage !== undefined;
}

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

function collectCell({ cell, variables, map }) {
	const [component, ...rest] = cell;
	const { componentType } = component;
	let next = map;
	if (componentType) {
		next = {
			...map,
			...collecteComponentResponse({ component, variables, map }),
		};
	}

	if (rest.length) {
		return collectCell({ cell: rest, variables, map: next });
	}
	return next;
}

function collectTableResponse({ map, body, variables }) {
	if (Array.isArray(body)) {
		return body.reduce(function (sub, cell) {
			if (Array.isArray(cell)) {
				return collectCell({ cell, variables, map: sub });
			}
			return sub;
		}, map);
	}
	return map;
}

function collecteComponentResponse({ component, variables, map = {} }) {
	const { components, response, responses, body } = component;

	if (body) {
		return collectTableResponse({ map, body, variables });
	}
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
}

export default getComponentValue;
