import isPaginatedLoop from './is-paginated-loop';
import isRoundabout from './is-roundabout';
import type { LunaticComponentDefinition, LunaticReducerState } from '../type';
import type { LunaticSource } from '../type';

function isUnpaginated(questionnaire: { maxPage?: unknown }): boolean {
	const { maxPage } = questionnaire;
	return maxPage === undefined;
}

/**
 * Append component to the right page in the accumulator
 */
function mergeComponent(
	component: LunaticComponentDefinition,
	page: string,
	map: LunaticReducerState['pages']
): LunaticReducerState['pages'] {
	if (!page) {
		page = 'unpaged';
	}
	if (page in map) {
		const current = map[page];
		const { components } = current;
		return {
			...map,
			[page]: { ...current, components: [...components, component] },
		};
	}
	return {
		...map,
		[page]: { components: [component] },
	} as LunaticReducerState['pages'];
}

/**
 * Merge child components in the map
 */
function mergeNestedComponents(
	components: LunaticSource['components'],
	map: LunaticReducerState['pages']
): LunaticReducerState['pages'] {
	return components.reduce(function (current, component) {
		const { page } = component;
		if (page) {
			return mergeComponent(component, page, current);
		}

		return current;
	}, map);
}

/**
 * Extract pages from questionnaire
 */
function createPages(
	questionnaire: LunaticSource
): LunaticReducerState['pages'] {
	const { components } = questionnaire;
	// If we have no page, create one with all the components
	if (isUnpaginated(questionnaire)) {
		return { '1': { components: components, isLoop: false } };
	}
	return components.reduce(
		function (current, component) {
			if (isPaginatedLoop(component) || isRoundabout(component)) {
				return mergeComponent(
					component,
					component.page,
					mergeNestedComponents(component.components, current)
				);
			}

			return mergeComponent(component, component.page, current);
		},
		{} as LunaticReducerState['pages']
	);
}

export default createPages;
