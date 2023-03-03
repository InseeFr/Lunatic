import { LunaticState } from '../../type';

const isPageReached = (page: string, lastReachedPage: string) =>
	parseInt(page, 10) <= parseInt(lastReachedPage, 10);

export const overviewOnChange = (state: LunaticState): LunaticState => {
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
			if (!overviewEntry.reached) {
				return {
					...overviewEntry,
					reached: isPageReached(overviewEntry.page, lastReachedPage ?? '1'),
				};
			}
			return overviewEntry;
		}
		return {
			...overviewEntry,
			reached: isPageReached(overviewEntry.page, lastReachedPage ?? '1'),
			visible:
				executeExpression(overviewEntry.conditionFilter, {
					bindingDependencies:
						overviewEntry.conditionFilter?.bindingDependencies,
				}) ?? false,
			evaluatedLabel: executeExpression(overviewEntry.label),
		};
	}) satisfies LunaticState['overview'];
	return { ...state, overview: updatedOverview };
};
