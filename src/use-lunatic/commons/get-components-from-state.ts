import type { LunaticState } from '../type';
import { LunaticComponentDefinition } from '../type';

/**
 * Extract the list of components to display for the current page
 */
function getComponentsFromState(
	state: Pick<LunaticState, 'pager' | 'pages' | 'isInLoop'>
): LunaticComponentDefinition[] {
	const { pager, pages, isInLoop } = state;
	const { page, subPage } = pager;
	if (page && pages && page in pages) {
		const current = pages[page];
		if (isInLoop && current.subPages) {
			const { subPages } = current;
			const stepName = subPages[subPage ?? '0'];
			if (stepName in pages) {
				const currentSubPage = pages[stepName];
				const { components } = currentSubPage;
				return filterComponentsInPage(components);
			}
		} else {
			const { components } = current;
			return filterComponentsInPage(components);
		}
	}

	return [];
}

/**
 * Filter components to show from the list
 */
function filterComponentsInPage(components: LunaticComponentDefinition[]) {
	if (!Array.isArray(components)) {
		console.warn('no components!');
		return []
	}
	return components.filter((c) =>
		c.componentType === 'FilterDescription' ? c.filterDescription : true
	);
}

export default getComponentsFromState;
