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
	const { pages, inLoop, step, nbStep, unity, nbUnity, page } = state;
	console.log({ inLoop, page });
	if (inLoop) {
		if (step < nbStep) {
			return {
				...state,
				step: step + 1,
			};
		} else {
			if (unity < nbUnity) {
				return {
					...state,
					step: 0,
					unity: unity + 1,
				};
			} else {
				const next = getNextPage(state);
				return {
					...state,
					page: next,
					step: undefined,
					nbStep: undefined,
					inLoop: false,
				};
			}
		}
	} else {
		const next = getNextPage(state);
		const nextPage = pages[next];
		const { isLoop, subPages } = nextPage;
		if (isLoop) {
			return {
				...state,
				page: next,
				step: 0,
				nbStep: subPages.length,
				unity: 0,
				nbUnity: 4, // TODO
				inLoop: true,
			};
		}
		return {
			...state,
			page: next,
			step: undefined,
			nbStep: undefined,
			unity: undefined,
			nbUnity: undefined,
		};
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
