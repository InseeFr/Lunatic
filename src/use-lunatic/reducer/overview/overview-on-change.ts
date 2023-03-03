import { LunaticState } from '../../type';
import { isPageReached } from '../../commons/page-tag';

export const overviewOnChange = (state: LunaticState) => {
	// The breadcrumb was not initialized, do nothing
	if (state.overview.length === 0) {
		return state;
	}

	const {
		overview,
		pager: { page, lastReachedPage },
		executeExpression,
	} = state;

	const updatedOverview = overview.map((overviewEntry) => {
		// page avant la page courante : pas de changement de state possible
		if (parseInt(overviewEntry.page, 10) < parseInt(page, 10)) {
			if (overviewEntry.reached === false) {
				return {
					...overviewEntry,
					reached: isPageReached(overviewEntry.page, lastReachedPage),
				};
			}
			return overviewEntry;
		}
		return {
			...overviewEntry,
			reached: isPageReached(overviewEntry.page, lastReachedPage),
			visible:
				executeExpression(overviewEntry.conditionFilter, {
					bindingDependencies:
						overviewEntry.conditionFilter.bindingDependencies,
				}) ?? false,
			evaluatedLabel: executeExpression(overviewEntry.label),
		};
	});
	return { ...state, overview: updatedOverview };
};
