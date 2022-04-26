// /* */

function turnPage(state) {
	const { pager, pages: pagesMap } = state;
	const { pageTag, iterations, nbIterations } = pager;
	const currentPage = pagesMap[pageTag];
	const { next: nextTag, levels: currentLevels } = currentPage;
	const nextPage = pagesMap[nextTag];
	const { levels: nextLevels } = nextPage;

	if (nextLevels.length > currentLevels.length) {
		const depth = currentLevels.length;

		if (iterations.length >= depth) {
			return { ...pager, pageTag: nextTag };
		}

		const { iterations: itExpression } = currentPage;
		if (!itExpression) {
			throw new Error(`Iterations is not defined à la page ${pageTag}`);
		}
		const nb = 2;
		return {
			...pager,
			pageTag: nextTag,
			iterations: [...iterations, 0],
			nbIterations: [...nbIterations, nb],
		};
	}

	if (nextLevels.length < currentLevels.length) {
		const nextIterations = [...iterations];
		const nextNbIterations = [...nbIterations];
		nextIterations.pop();
		nextNbIterations.pop();
		return {
			...pager,
			pageTag: nextTag,
			iterations: nextIterations,
			nbIterations: nextNbIterations,
		};
	}

	return { ...pager, pageTag: nextTag };
}

function isInloop(state) {
	const { pager } = state;
	const { iterations } = pager;
	return iterations && iterations.length > 0;
}

function resolveNextIteration(state) {
	const { pager, pages: pagesMap } = state;
	const { pageTag, iterations, nbIterations } = pager;
	const currentPage = pagesMap[pageTag];
	const { parent } = currentPage;

	if (parent) {
		const { levels, next } = pagesMap[parent];
		const depth = levels.length - 1;
		const done = iterations[depth];
		const todo = nbIterations[depth];
		/* */
		if (done < todo - 1) {
			const iterationsNext = [...iterations];
			iterationsNext[depth] = done + 1;

			return {
				...pager,
				pageTag: next,
				iterations: iterationsNext,
			};
		}
		/* */

		if (depth > 0) {
			const nextIterations = [...iterations];
			const nextNbIterations = [...nbIterations];
			nextIterations.pop();
			nextNbIterations.pop();

			return resolveNextIteration({
				...state,
				pager: {
					...pager,
					pageTag: parent,
					nbIterations: nextNbIterations,
					iterations: nextIterations,
				},
			});
		}
		console.log({ depth, next, parent, pagesMap });
		return turnPage({
			...state,
			pager: { ...pager, pageTag: next, nbIterations: [], iterations: [] },
		});
	}

	return pager;
}

function resolveLoop(state) {
	const { pager, pages: pagesMap } = state;
	const { pageTag, iterations, nbIterations } = pager;
	const currentPage = pagesMap[pageTag];
	const { next: nextTag, levels: currentLevels } = currentPage;
	const nextPage = pagesMap[nextTag];
	const { levels: nextLevels } = nextPage;

	if (nextLevels.length > currentLevels.length) {
		return turnPage(state); // on descend dans l'arbre
	}
	if (nextLevels.length === currentLevels.length) {
		return turnPage(state); // page suivante sur l'itération courante
	}
	if (nextLevels.length < currentLevels.length) {
		return resolveNextIteration(state);
	}
	return pager;
}

function goNext(state) {
	if (isInloop(state)) {
		return resolveLoop(state);
	}
	return turnPage(state);
}

export default goNext;
