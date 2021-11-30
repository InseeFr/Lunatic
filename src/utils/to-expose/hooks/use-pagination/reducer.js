import * as actions from './actions';

function getNextPage(state) {
	const { page, maxPage } = state;
	const p = Number.parseInt(page);
	const mp = Number.parseInt(maxPage);
	if (p < mp) {
		return `${p + 1}`;
	}
	return maxPage;
}

function reduceGoNext(state) {
	const { pages, inLoop, iteration, nbIterations, subPage, nbSubPages, page } =
		state;
	if (inLoop) {
		if (subPage < nbSubPages - 1) {
			return {
				...state,
				subPage: subPage + 1,
			};
		} else {
			if (iteration < nbIterations - 1) {
				return {
					...state,
					subPage: 0,
					iteration: iteration + 1,
				};
			} else {
				const next = getNextPage(state);
				return {
					...state,
					page: next,
					iteration: undefined,
					nbIterations: undefined,
					subPage: undefined,
					nbSubPages: undefined,
					inLoop: false,
				};
			}
		}
	} else {
		const current = pages[page];
		const { isLoop, subPages } = current;
		if (isLoop) {
			return {
				...state,
				page,
				subPage: 0,
				nbSubPages: subPages.length,
				iteration: 0,
				nbIterations: 2, // TODO interpreter iterations
				inLoop: true,
			};
		} else {
			const next = getNextPage(state);
			return {
				...state,
				page: next,
				subPage: undefined,
				nbSubPages: undefined,
				iteration: undefined,
				nbIterations: undefined,
				inLoop: false,
			};
		}
	}
}

function reducer(state, action) {
	const { type } = action;
	switch (type) {
		case actions.GO_NEXT:
			return reduceGoNext(state);
		default:
			return state;
	}
}

export default reducer;
