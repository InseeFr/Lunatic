import { ActionGoNextPage } from '../actions';
import { getCompatibleVTLExpression, getNewReachedPage } from '../commons';
import compose from '../commons/compose';
import { ExpressionType, LunaticState } from '../type';
import { isOnEmptyPage, validateLoopConditionFilter } from './commons';
import { overviewOnChange } from './overview/overview-on-change';
import { reduceToRoundabout } from './reduce-roundabout';

function getNextPage(state: LunaticState) {
	const { pager } = state;
	const { page, maxPage } = pager;
	const p = Number.parseInt(page);
	const mp = Number.parseInt(maxPage);
	if (p < mp) {
		return `${p + 1}`;
	}
	return `${maxPage}`;
}

function reduceNextSubPage(state: LunaticState) {
	const { pager } = state;
	const { subPage } = pager;
	const newPager = {
		...pager,
		subPage: (subPage ?? 0) + 1,
		shallowIteration: undefined,
	};
	return {
		...state,
		pager: { ...newPager, lastReachedPage: getNewReachedPage(newPager) },
		modalErrors: undefined,
	};
}

function reduceNextIteration(state: LunaticState) {
	const { pager } = state;
	const { iteration, roundabout } = pager;

	if (roundabout) {
		return reduceToRoundabout(state);
	}

	const newPager = {
		...pager,
		subPage: 0,
		iteration: (iteration ?? 0) + 1,
	};

	return {
		...state,
		pager: {
			...newPager,
			lastReachedPage: getNewReachedPage(newPager),
		},
		modalErrors: undefined,
	};
}

function reduceNextPage(state: LunaticState, { next }: { next: string }) {
	const { pager } = state;
	const newPager = {
		...pager,
		page: next,
		iteration: undefined,
		nbIterations: undefined,
		subPage: undefined,
		nbSubPages: undefined,
		shallowIteration: undefined,
	};
	return {
		...state,
		isInLoop: false,
		pager: {
			...newPager,
			lastReachedPage: getNewReachedPage(newPager),
		},
		modalErrors: undefined,
	};
}

function reduceStartLoop(
	state: LunaticState,
	{
		next,
		iterations,
		loopDependencies,
	}: { next: string; iterations: ExpressionType; loopDependencies?: string[] }
): LunaticState {
	const { pages, pager, executeExpression } = state;
	const { subPages } = pages[next];

	if (!validateLoopConditionFilter(state, { next })) {
		const newPager = {
			...pager,
			page: next,
			subPage: undefined,
			nbSubPages: undefined,
			iteration: undefined,
			nbIterations: undefined,
			shallowIteration: undefined,
		};
		return {
			...state,
			pager: {
				...newPager,
				lastReachedPage: getNewReachedPage(newPager),
			},
		};
	}

	const nbIterations = executeExpression<number>(
		getCompatibleVTLExpression(iterations)
	);

	if (Array.isArray(subPages)) {
		const newPager = {
			...pager,
			page: next,
			subPage: 0,
			nbSubPages: subPages.length,
			iteration: 0,
			nbIterations,
			shallowIteration: undefined,
		};
		return {
			...state,
			isInLoop: true,
			pager: {
				...newPager,
				lastReachedPage: getNewReachedPage(newPager),
			},
		};
	}
	return state;
}

function validateChange(state: LunaticState): LunaticState {
	if (isOnEmptyPage(state)) {
		return reduceGoNextPage(state);
	}
	return state;
}

function reduceGoNextPage(state: LunaticState): LunaticState {
	const { pages, isInLoop, pager, variables } = state;
	const { iteration, nbIterations, subPage, nbSubPages, page, roundabout } = {
		nbSubPages: 0,
		iteration: 0,
		nbIterations: 0,
		...pager,
	};
	/* next iteration of loop/roundabout */
	if (isInLoop && subPage !== undefined && subPage < nbSubPages - 1) {
		return validateChange(reduceNextSubPage(state));
	}
	/* next subpage of loop/roundabout */
	if (isInLoop && subPage === nbSubPages - 1 && iteration < nbIterations - 1) {
		return validateChange(reduceNextIteration(state));
	}
	/* exit of a roundabout */
	if (roundabout && nbIterations > 1) {
		return reduceToRoundabout(state);
	}

	const next = getNextPage(state);
	const { isLoop, iterations, loopDependencies } = pages[next];

	if (next === page) {
		// TODO: check why next === page, doesn't seems to be normal
		return state;
	}

	if (isLoop && iterations !== undefined) {
		return validateChange(
			reduceStartLoop(state, { next, iterations, loopDependencies })
		);
	}
	return validateChange(reduceNextPage(state, { next }));
}

export default compose<ActionGoNextPage>(reduceGoNextPage, overviewOnChange);
