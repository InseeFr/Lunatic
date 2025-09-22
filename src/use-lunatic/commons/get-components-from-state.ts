import type { LunaticComponentDefinition, LunaticReducerState } from '../type';

/**
 *
 * @param state
 * @param ignoreAutoSubPages : (default: `false`), For pagination, during computation of next page, we check if there is component on a page
 * before exploring inside Loop, so we have to return only the Loop component (and not it's child)
 * So if we are computing page (during next or previous action), we have to return only Loop component
 * During process of computing page, we reached Loop by the root (with subpage or iteration undefined)
 * So if you're computing pages, set it to `true`
 * @returns the list of components to display for the current page
 */
export function getComponentsFromState(
	state: Pick<LunaticReducerState, 'pager' | 'pages' | 'isInLoop'>,
	ignoreAutoSubPages = false
): LunaticComponentDefinition[] {
	const { pager, pages, isInLoop } = state;
	const { page, subPage } = pager;
	if (page && pages && page in pages) {
		const current = pages[page];
		if (isInLoop && current.subPages) {
			const { subPages } = current;
			if (ignoreAutoSubPages && subPage === undefined)
				return current.components;
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
