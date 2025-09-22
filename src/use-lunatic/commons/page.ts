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
export function isPageEmpty(state: LunaticReducerState): boolean {
	const { executeExpression, pager, options } = state;
	const { iteration } = pager;
	const components = getComponentsFromState(state, true);
	const visibleComponents = components.filter((component) => {
		if (options.disableFilters) {
			return true;
		}

		// The component is a paginated loop, consider it invisible if iteration size is 0
		if ('paginatedLoop' in component && component.paginatedLoop) {
			const iterations = state.executeExpression<number>(component.iterations);
			if (!iterations) {
				return false;
			}
		}

		// Use condition filter if present
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
