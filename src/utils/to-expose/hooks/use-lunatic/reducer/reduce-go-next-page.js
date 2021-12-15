import { getComponentsFromState, executeConditionFilter } from '../commons';

function getNextPage(state) {
	const { pager } = state;
	const { page, maxPage } = pager;
	const p = Number.parseInt(page);
	const mp = maxPage;
	if (p < mp) {
		return `${p + 1}`;
	}
	return maxPage;
}

function reduceNextSubPage(state) {
	const { pager } = state;
	const { subPage } = pager;
	return {
		...state,
		pager: { ...pager, subPage: subPage + 1 },
	};
}

function reduceNextIteration(state) {
	const { pager } = state;
	const { iteration } = pager;
	return {
		...state,
		pager: { ...pager, subPage: 0, iteration: iteration + 1 },
	};
}

function reduceNextPage(state, { next, iterations }) {
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
		},
	};
}

function reduceStartLoop(state, { next, iterations }) {
	const { pages, pager, executeExpression } = state;
	const { subPages } = pages[next];
	const nbIterations = executeExpression(iterations);

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
			},
		};
	}
	return state;
}

function validateChange(state) {
	const { executeExpression } = state;

	const components = getComponentsFromState(state);

	const rest = components.reduce(function (rest, component) {
		const { conditionFilter } = component;
		if (conditionFilter) {
			const result = executeConditionFilter(conditionFilter, executeExpression);
			if (result === true) {
				return [...rest, component];
			}
		}
		return rest;
	}, []);

	if (!rest.length) {
		return reduceGoNext(state);
	}

	return state;
}

function reduceGoNext(state) {
	const { pages, isInLoop, pager } = state;
	const { iteration, nbIterations, subPage, nbSubPages, page } = pager;

	if (isInLoop && subPage < nbSubPages - 1) {
		return validateChange(reduceNextSubPage(state));
	}
	if (isInLoop && subPage === nbSubPages - 1 && iteration < nbIterations - 1) {
		return validateChange(reduceNextIteration(state));
	}

	const next = getNextPage(state);
	const { isLoop, iterations } = pages[next];
	if (next === page) {
		// TODO on devrait jamais en arriver là !
	}

	if (isLoop) {
		return validateChange(reduceStartLoop(state, { next, iterations }));
	}
	return validateChange(reduceNextPage(state, { next, iterations }));
}

export default reduceGoNext;
