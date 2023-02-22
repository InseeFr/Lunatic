import isPaginatedLoop from './is-paginated-loop';
import isRoundabout from './is-roundabout';
import { LunaticComponentDefinition, LunaticState } from '../type';
import { LunaticSource } from '../type-source';

function isUnpaginated(questionnaire: { maxPage?: unknown }): boolean {
	const { maxPage } = questionnaire;
	return maxPage === undefined;
}

/**
 * Append component to the right page in the accumulator
 */
function componentToPage(
	pages: LunaticState['pages'],
	component: LunaticComponentDefinition
): LunaticState['pages'] {
	if (isPaginatedLoop(component) || isRoundabout(component)) {
		pages = mergeNestedComponents(pages, component.components);
	}
	let { page } = component;
	if (!page) {
		page = 'unpaged';
	}
	if (page in pages) {
		const current = pages[page];
		const { components } = current;
		return {
			...pages,
			[page]: { ...current, components: [...components, component] },
		};
	}
	return {
		...pages,
		[page]: { components: [component] },
	} as LunaticState['pages'];
}

/**
 * Merge child components in the map
 */
function mergeNestedComponents(
	pages: LunaticState['pages'],
	components: LunaticComponentDefinition[]
): LunaticState['pages'] {
	return components.reduce(function (acc, component) {
		if (component.page) {
			return componentToPage(acc, component);
		}

		return pages;
	}, pages);
}

/**
 * Extract pages from questionnaire
 */
function createPages(questionnaire: LunaticSource): LunaticState['pages'] {
	const { components } = questionnaire;
	// If we have no page, create one with all the components
	if (isUnpaginated(questionnaire)) {
		return { '1': { components: components, isLoop: false } };
	}
	return components.reduce(componentToPage, {} as LunaticState['pages']);
}

export default createPages;
