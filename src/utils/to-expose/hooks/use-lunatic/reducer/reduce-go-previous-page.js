function getPreviousPage(pager) {
	const { page } = pager;
	const p = Number.parseInt(page);
	if (p > 1) {
		return `${page - 1}`;
	}
	return page;
}

function goPreviousPage(state, previous) {
	const { pager } = state;
	const { page } = pager;
	if (previous !== page) {
		return {
			...state,
			isInLoop: false,
			pager: {
				...pager,
				page: previous,
				iteration: undefined,
				nbIterations: undefined,
				subPage: undefined,
				nbSubPages: undefined,
			},
		};
	}

	return state;
}

function reduceGoPreviousPage(state) {
	const { pages, pager, isInLoop } = state;
	const { iteration, subPage, nbSubPages } = pager;

	// dans une boucle et l'itération courante n'est pas finie
	if (isInLoop && subPage > 0) {
		// TODO
		return state;
	}
	// dans une boucle, l'itération courante est finie mais il reste encore au moins une autre
	if (isInLoop && subPage === nbSubPages - 1 && iteration > 0) {
		// TODO
		return state;
	}

	const previous = getPreviousPage(pager);
	const { isLoop, iterations } = pages[previous];
	// on rentre dans une boucle
	if (isLoop) {
		// TODO
		return state;
	}
	// on change de page
	return goPreviousPage(state, previous);
}

export default reduceGoPreviousPage;
