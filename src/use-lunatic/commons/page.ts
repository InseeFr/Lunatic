import type { LunaticReducerState } from '../type';
import { getComponentsFromState } from './get-components-from-state';
import executeConditionFilter from './execute-condition-filter';

export function getPageId({
	subPage,
	page,
}: Pick<LunaticReducerState['pager'], 'page' | 'subPage'>) {
	if (subPage === undefined) {
		return page;
	}
	return `${page}.${subPage + 1}`;
}

/**
 * Converts a page number (3.1.2) to an array of numbers [3, 1, 2]
 */
export function pageStringToNumbers(page: string): number[] {
	return page.split('.').map((v) => parseInt(v, 10));
}

/**
 * Check if we are on an empty page
 * if no components can be displayed on this page (using filter)
 */
export function isPageEmpty(
	state: LunaticReducerState,
	isMovingBackward = false
): boolean {
	const { executeExpression, pager } = state;
	const { iteration } = pager;
	const components = getComponentsFromState(state);
	const visibleComponents = components.filter((component) => {
		if ('conditionFilter' in component && component.conditionFilter) {
			return executeConditionFilter(
				component.conditionFilter,
				executeExpression,
				iteration
			);
		}
		return true;
	});

	// No components are displayable on this page
	if (visibleComponents.length === 0) {
		return true;
	}

	return false;
}
