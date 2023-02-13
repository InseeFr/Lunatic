import type { LunaticState } from '../type';
import clearPager from '../commons/check-pager';

export function reduceToRoundabout(state: LunaticState) {
	const { pager } = state;
	const { roundabout } = pager;
	if (!roundabout) {
		return state;
	}
	const { page } = roundabout;
	return {
		...state,
		isInLoop: false,
		pager: {
			...clearPager(pager),
			page,
		},
		modalErrors: undefined,
	};
}
