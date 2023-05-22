import { LunaticComponentDefinition, LunaticState } from '../../type';
import { ResponseType } from '../../type-source';

type AccumulatorMap = Record<string, unknown>;

function isInSubPage(state: Pick<LunaticState, 'pager'>) {
	const { pager } = state;
	const { subPage } = pager;

	return subPage !== undefined;
}

/**
 * Add the value from variable indexed by response name
 */
function mergeResponse({
	map,
	response,
	variables,
}: {
	map: AccumulatorMap;
	response: { name: string };
	variables: LunaticState['variables'];
}) {
	const { name } = response;
	if (name in variables) {
		return { ...map, [name]: variables[name].value };
	}
	return map;
}

function collecteArrayResponses({
	components,
	variables,
	map = {},
}: {
	components: LunaticComponentDefinition[];
	variables: LunaticState['variables'];
	map: AccumulatorMap;
}): AccumulatorMap {
	return components.reduce(function (sub, component) {
		return collecteComponentResponse({
			component,
			variables,
			map: sub,
		});
	}, map);
}

function collectCell({
	cell,
	variables,
	map,
}: {
	cell: LunaticComponentDefinition[];
	variables: LunaticState['variables'];
	map: AccumulatorMap;
}): AccumulatorMap {
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

function collectTableResponse({
	map,
	body,
	variables,
}: {
	map: AccumulatorMap;
	body: LunaticComponentDefinition<'RosterForLoop'>['body'];
	variables: LunaticState['variables'];
}) {
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

function collecteComponentResponse({
	component,
	variables,
	map = {},
}: {
	component: LunaticComponentDefinition;
	variables: LunaticState['variables'];
	map?: AccumulatorMap;
}) {
	if ('body' in component && component.body) {
		return collectTableResponse({ map, body: component.body, variables });
	}
	if ('response' in component) {
		return mergeResponse({ map, response: component.response, variables });
	}
	if ('components' in component) {
		return collecteArrayResponses({
			components: component.components,
			variables,
			map,
		});
	}
	if ('responses' in component) {
		// TODO : Understand this cause types doesn't match
		return collecteArrayResponses({
			components: component.responses as LunaticComponentDefinition[],
			variables,
			map,
		});
	}
	return map;
}

function checkArrayForSubPage(map: AccumulatorMap, state: LunaticState) {
	const { pager } = state;
	const { iteration } = pager;

	return Object.entries(map).reduce(function (sub, [name, value]) {
		if (value && Array.isArray(value) && iteration !== undefined) {
			return { ...sub, [name]: value[iteration] };
		}
		return { ...sub, [name]: value };
	}, {} as Record<string, unknown>);
}

function checkUseContext(map: AccumulatorMap, state: LunaticState) {
	if (isInSubPage(state)) {
		return checkArrayForSubPage(map, state);
	}
	return map;
}

/**
 * The component provide a direct response (not a loop, roster...)
 */
function isSimpleComponent(
	component: LunaticComponentDefinition
): component is LunaticComponentDefinition & { response: ResponseType } {
	return 'response' in component && typeof component.response === 'object';
}

/**
 * Get the value from the component
 */
function getComponentValue(
	component: LunaticComponentDefinition,
	state: LunaticState
): unknown {
	const { variables } = state;
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
