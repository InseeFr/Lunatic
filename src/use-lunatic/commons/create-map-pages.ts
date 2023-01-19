import isPaginatedLoop from './is-paginated-loop';
import { LunaticComponentDefinition, LunaticState } from '../type';
import { LunaticSource } from '../type-source';

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
	map: LunaticState['pages']
) {
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
	return { ...map, [page]: { components: [component] } };
}

/**
 * Merge child components in the map
 */
function mergeNestedComponents(
	components: LunaticComponentDefinition[],
	map: LunaticState['pages']
): LunaticState['pages'] {
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
function createPages(questionnaire: LunaticSource): LunaticState['pages'] {
	const { components } = questionnaire;
	// If we have no page, create one with all the components
	if (isUnpaginated(questionnaire)) {
		return { '1': { components } };
	}
	return components.reduce(function (current, component) {
		if (isPaginatedLoop(component)) {
			return mergeComponent(
				component,
				component.page,
				mergeNestedComponents(component.components, current)
			);
		}

		return mergeComponent(component, component.page, current);
	}, {} as LunaticState['pages']);
}

export default createPages;
