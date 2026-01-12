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
	return page.split('.').map((v) => Number.parseInt(v, 10));
}

// see useLoopUtils.ts
function getIterationOfLoop(
	component: LunaticComponentDefinition,
	executeExpression: LunaticReducerState['executeExpression']
) {
	const min =
		'lines' in component ? executeExpression<number>(component.lines.min) : 0;
	const iterations =
		'iterations' in component
			? executeExpression<number>(component.iterations)
			: 0;
	return Math.max(min, iterations);
}

/**
 * Check if component has a conditionFilter defined
 * @param component
 * @returns
 */
function hasConditionFilter(component: LunaticComponentDefinition): boolean {
	return 'conditionFilter' in component && !!component.conditionFilter;
}

/**
 * Check if a not paginated Loop has at least one component to display
 * @param component
 * @param state
 * @returns boolean indicating if the not paginated Loop is empty
 */
function hasAtLeastOneComponentVisible(
	component: LunaticComponentDefinition,
	state: LunaticReducerState
): boolean {
	if (component.componentType === 'Loop' && !component.paginatedLoop) {
		const nbIteration = getIterationOfLoop(component, state.executeExpression);
		for (
			let iterationOfLoop = 0;
			iterationOfLoop < nbIteration;
			iterationOfLoop++
		) {
			for (const c of component.components) {
				// if no conditionFilter -> component is visible
				if (!hasConditionFilter(c)) return true;
				if (
					executeConditionFilter(
						// @ts-expect-error Seem to be a typescript issue since we check type with hasConditionFilter, c.conditionFilter is defined
						c.conditionFilter,
						state.executeExpression,
						iterationOfLoop
					)
				) {
					return true;
				}
			}
		}
		// no component visible in all iterations
		return false;
	}
	// not a Loop
	return true;
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
			// if the conditionFilter of NOT paginated Loop is true (have to be visible), we have to check if at least one component is visible inside
			return hasAtLeastOneComponentVisible(component, state);
		}
		return true;
	});

	// No components are displayable on this page
	if (visibleComponents.length === 0) {
		return true;
	}

	return false;
}
