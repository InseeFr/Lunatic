import { LunaticState } from '../type';
import { isNewReachedPage } from '../commons';

export function reduceLastReachedPage(state: LunaticState): LunaticState {
	if (!isNewReachedPage(state.pager)) {
		return state;
	}

	return {
		...state,
		pager: {
			...state.pager,
			lastReachedPage: {
				page: state.pager.page,
				iteration: state.pager.iteration,
			},
		},
	};
}
