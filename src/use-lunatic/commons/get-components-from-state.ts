import type { LunaticComponentDefinition, LunaticReducerState } from '../type';

/**
 * Extract the list of components to display for the current page
 */
export function getComponentsFromState(
	state: Pick<LunaticReducerState, 'pager' | 'pages' | 'isInLoop'>
): LunaticComponentDefinition[] {
	const { pager, pages, isInLoop } = state;
	const { page, subPage } = pager;
	if (page && pages && page in pages) {
		const current = pages[page];
		if (isInLoop && current.subPages) {
			const { subPages } = current;
			const stepName = subPages[subPage ?? '0'];
			if (stepName in pages) {
				return pages[stepName].components;
			}
		} else {
			return current.components;
		}
	}

	return [];
}
