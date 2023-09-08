import { LunaticState } from '../type';
import { executeConditionFilter, getComponentsFromState } from './index';

export function getPageId({
	subPage,
	page,
}: Pick<LunaticState['pager'], 'page' | 'subPage'>) {
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
	state: LunaticState,
	isMovingBackward = false
): boolean {
	const { executeExpression, pager } = state;
	const { iteration } = pager;
	const components = getComponentsFromState(state);
	const visibleComponents = components.filter(function (component) {
		const { conditionFilter } = component;
		if (conditionFilter) {
			return executeConditionFilter(
				conditionFilter,
				executeExpression,
				iteration
			);
		}
		return true;
	});

	// When moving backward, modal only pages should be skipped
	if (
		isMovingBackward &&
		visibleComponents.length === 1 &&
		visibleComponents[0].componentType === 'ConfirmationModal'
	) {
		return true;
	}

	// No components are displayable on this page
	if (visibleComponents.length === 0) {
		return true;
	}

	return false;
}
