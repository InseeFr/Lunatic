import type { LunaticComponentDefinition, LunaticReducerState } from '../type';
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

function isEmptyNotPaginatedLoop(
	component: LunaticComponentDefinition,
	state: LunaticReducerState
): boolean {
	if (
		component.componentType === 'Loop' &&
		'lines' in component &&
		!component.paginatedLoop
	) {
		const nbIteration = state.executeExpression<number>(component.lines.min);
		// 0 iteration -> remove the Loop from visible components
		if (nbIteration === 0) return false;
		let nbComponentInside = 0;
		for (
			let iterationOfLoop = 0;
			iterationOfLoop < nbIteration;
			iterationOfLoop++
		) {
			const componentsAtIteration = component.components.filter((c) => {
				if ('conditionFilter' in c && c.conditionFilter) {
					return executeConditionFilter(
						c.conditionFilter,
						state.executeExpression,
						iterationOfLoop
					);
				}
				return true;
			});
			nbComponentInside += componentsAtIteration.length;
		}
		// No components inside the not paginated Loop -> remove the Loop from visible components
		if (nbComponentInside === 0) return true;
	}
	return false;
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
			const conditionFilterResult = executeConditionFilter(
				component.conditionFilter,
				executeExpression,
				iteration
			);
			// early return if the result of filter is false
			if (!conditionFilterResult) return false;
			// early return if the component is not a not Loop
			if (component.componentType !== 'Loop') return conditionFilterResult;
			return !isEmptyNotPaginatedLoop(component, state);

			// if the conditionFilter of NOT paginated Loop is true (have to be visible), we check if all components inside, if all components
		}
		return true;
	});

	// No components are displayable on this page
	if (visibleComponents.length === 0) {
		return true;
	}

	return false;
}
