import { isOnEmptyPage, validateLoopConditionFilter } from './commons';
import { getCompatibleVTLExpression, getNewReachedPage } from '../commons';
import {
	createControlsReducer,
	createModalControlsReducer,
} from './validate-controls';
import clearPager from '../commons/clear-pager';

function returnToRoundabout(state) {
	const { pager } = state;
	const { roundabout } = pager;
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

function getNextPage(state) {
	const { pager } = state;
	const { page, maxPage } = pager;
	const p = Number.parseInt(page);
	const mp = Number.parseInt(maxPage);
	if (p < mp) {
		return `${p + 1}`;
	}
	return `${maxPage}`;
}

function reduceNextSubPage(state) {
	const { pager } = state;
	const { subPage } = pager;
	const newPager = {
		...pager,
		subPage: subPage + 1,
		shallowIteration: undefined,
	};
	return {
		...state,
		pager: { ...newPager, lastReachedPage: getNewReachedPage(newPager) },
		modalErrors: undefined,
	};
}

function reduceNextIteration(state) {
	const { pager } = state;
	const { iteration, roundabout } = pager;

	if (roundabout) {
		return returnToRoundabout(state);
	}

	const newPager = {
		...pager,
		subPage: 0,
		iteration: iteration + 1,
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

function reduceNextPage(state, { next }) {
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

function reduceStartLoop(state, { next, iterations, loopDependencies }) {
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
			modalErrors: undefined,
		};
	}

	/*  */
	const nbIterations = executeExpression(
		getCompatibleVTLExpression(iterations)
		// {
		// 	bindingDependencies: loopDependencies,
		// 	iteration: undefined,
		// }
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
			modalErrors: undefined,
		};
	}
	return state;
}

function validateChange(state) {
	if (isOnEmptyPage(state)) {
		return reduceGoNextPage(state);
	}
	return state;
}

function reduceGoNextPage(state) {
	const { pages, isInLoop, pager } = state;
	const { iteration, nbIterations, subPage, nbSubPages, page, roundabout } =
		pager;

	/* next iteration of loop/roundabout */
	if (isInLoop && subPage < nbSubPages - 1) {
		return validateChange(reduceNextSubPage(state));
	}
	/* next subpage of loop/roundabout */
	if (isInLoop && subPage === nbSubPages - 1 && iteration < nbIterations - 1) {
		return validateChange(reduceNextIteration(state));
	}
	/* exit of a roundabout */
	if (roundabout && nbIterations > 1) {
		return returnToRoundabout(state);
	}

	/* got to next page */
	const next = getNextPage(state);
	const { isLoop, iterations, loopDependencies } = pages[next];

	if (next === page) {
		// TODO: check why next === page, doesn't seems to be normal
		return state;
	}

	if (isLoop) {
		return validateChange(
			reduceStartLoop(state, { next, iterations, loopDependencies })
		);
	}
	return validateChange(reduceNextPage(state, { next }));
}

export default createModalControlsReducer(
	createControlsReducer(reduceGoNextPage)
);
