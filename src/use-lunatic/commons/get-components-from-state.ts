import type { LunaticState } from '../type';
import { LunaticComponentDefinition } from '../type';

/**
 * Extract the list of components to display for the current page
 */
function getComponentsFromState({
	pager,
	pages,
}: Pick<LunaticState, 'pager' | 'pages'>): LunaticComponentDefinition[] {
	const pageId = pager.page.join('.');
	const currentPage = pages[pageId];
	if (!currentPage) {
		return [];
	}
	return filterComponentsInPage(currentPage.components);
}

/**
 * Filter components to show from the list
 */
function filterComponentsInPage(components: LunaticComponentDefinition[]) {
	if (!Array.isArray(components)) {
		console.warn('no components!');
		return [];
	}
	return components.filter((c) =>
		c.componentType === 'FilterDescription' ? c.filterDescription : true
	);
}

export default getComponentsFromState;
