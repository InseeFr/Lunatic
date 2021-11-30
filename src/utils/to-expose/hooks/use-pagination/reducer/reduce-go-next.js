function getNextPage(state) {
	const { page, maxPage } = state;
	const p = Number.parseInt(page);
	const mp = Number.parseInt(maxPage);
	if (p < mp) {
		return `${p + 1}`;
	}
	return maxPage;
}

function reduceNextSubPage(state) {
	const { subPage } = state;
	return {
		...state,
		subPage: subPage + 1,
	};
}

function reduceNextIteration(state) {
	const { iteration } = state;
	return {
		...state,
		subPage: 0,
		iteration: iteration + 1,
	};
}

function reduceNextPage(state) {
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

function reduceStartLoop(state) {
	const { page, pages } = state;
	const { subPages } = pages[page];
	if (Array.isArray(subPages)) {
		return {
			...state,
			page,
			subPage: 0,
			nbSubPages: subPages.length,
			iteration: 0,
			nbIterations: 2, // TODO interpreter iterations
			inLoop: true,
		};
	}
	return state;
}

function reduceGoNext(state) {
	const { pages, inLoop, iteration, nbIterations, subPage, nbSubPages, page } =
		state;
	const current = pages[page];
	const { isLoop } = current;

	if (inLoop && subPage < nbSubPages - 1) {
		return reduceNextSubPage(state);
	}
	if (inLoop && subPage === nbSubPages - 1 && iteration < nbIterations - 1) {
		return reduceNextIteration(state);
	}
	if (!inLoop && isLoop) {
		return reduceStartLoop(state);
	}
	return reduceNextPage(state);
}

export default reduceGoNext;
