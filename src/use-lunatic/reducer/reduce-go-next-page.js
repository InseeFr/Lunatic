import { isOnEmptyPage, validateLoopConditionFilter } from './commons';
import { getCompatibleVTLExpression } from '../commons';
import { createValidateReducer } from './validate-controls';

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
	return {
		...state,
		pager: { ...pager, subPage: subPage + 1 },
		errors: undefined,
	};
}

function reduceNextIteration(state) {
	const { pager } = state;
	const { iteration } = pager;
	return {
		...state,
		pager: {
			...pager,
			subPage: 0,
			iteration: iteration + 1,
		},
		errors: undefined,
	};
}

function reduceNextPage(state, { next }) {
	const { pager } = state;
	return {
		...state,
		isInLoop: false,
		pager: {
			...pager,
			page: next,
			iteration: undefined,
			nbIterations: undefined,
			subPage: undefined,
			nbSubPages: undefined,
			lastReachedPage: lastReachedPage(pager, next),
		},
		errors: undefined,
	};
}

function reduceStartLoop(state, { next, iterations, loopDependencies }) {
	const { pages, pager, executeExpression } = state;
	const { subPages } = pages[next];

	if (!validateLoopConditionFilter(state, { next })) {
		return {
			...state,
			pager: {
				...pager,
				page: next,
				subPage: undefined,
				nbSubPages: undefined,
				iteration: undefined,
				nbIterations: undefined,
				lastReachedPage: lastReachedPage(pager, next),
			},
			errors: undefined,
		};
	}
	/* 
	
	
	
	*/
	const nbIterations = executeExpression(
		getCompatibleVTLExpression(iterations),
		{
			bindingDependencies: loopDependencies,
			iteration: undefined,
		}
	);

	if (Array.isArray(subPages)) {
		return {
			...state,
			isInLoop: true,
			pager: {
				...pager,
				page: next,
				subPage: 0,
				nbSubPages: subPages.length,
				iteration: 0,
				nbIterations,
				lastReachedPage: lastReachedPage(pager, next),
			},
			errors: undefined,
		};
	}
	return state;
}

function lastReachedPage(pager, page) {
	//TODO improve case with sub and iterations
	return Number.parseInt(page) > Number.parseInt(pager.lastReachedPage)
		? page
		: pager.lastReachedPage;
}

function validateChange(state) {
	if (isOnEmptyPage(state)) {
		return reduceGoNextPage(state);
	}

	return state;
}

function reduceGoNextPage(state) {
	const { pages, isInLoop, pager } = state;
	const { iteration, nbIterations, subPage, nbSubPages, page } = pager;

	if (isInLoop && subPage < nbSubPages - 1) {
		return validateChange(reduceNextSubPage(state));
	}
	if (isInLoop && subPage === nbSubPages - 1 && iteration < nbIterations - 1) {
		return validateChange(reduceNextIteration(state));
	}

	const next = getNextPage(state);
	const { isLoop, iterations, loopDependencies } = pages[next];
	if (next === page) {
		// TODO on devrait jamais en arriver là !
		console.log("next === page, we shoudn't be there");
	}

	if (isLoop) {
		return validateChange(
			reduceStartLoop(state, { next, iterations, loopDependencies })
		);
	}
	return validateChange(reduceNextPage(state, { next }));
}

export default createValidateReducer(reduceGoNextPage);
