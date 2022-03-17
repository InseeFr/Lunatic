import { isOnEmptyPage } from './commons';
import { validateLoopConditionFilter } from './commons';
import { getCompatibleVTLExpression } from '../commons';

function getPreviousPage(pager) {
	const { page } = pager;
	const p = Number.parseInt(page);
	if (p > 1) {
		return `${page - 1}`;
	}
	return page;
}

function goStartLoop(state, { previous, iterations, loopDependencies }) {
	const { pages, pager, executeExpression } = state;
	const { subPages } = pages[previous];

	if (validateLoopConditionFilter(state, { next: previous })) {
		return {
			...state,
			pager: {
				...pager,
				page: previous,
				subPage: undefined,
				nbSubPages: undefined,
				iteration: undefined,
				nbIterations: undefined,
			},
		};
	}

	if (Array.isArray(subPages)) {
		const nbIterations = executeExpression(
			getCompatibleVTLExpression(iterations),
			{
				bindingDependencies: loopDependencies,
			}
		);
		return {
			...state,
			isInLoop: true,
			pager: {
				...pager,
				page: previous,
				subPage: subPages.length - 1,
				nbSubPages: subPages.length,
				iteration: nbIterations - 1,
				nbIterations,
			},
		};
	}
	return state;
}

function goPreviousSubPage(state) {
	const { pager } = state;
	const { subPage } = pager;

	return {
		...state,
		pager: { ...pager, subPage: subPage - 1 },
	};
}

function goPreviousIteration(state) {
	const { pager, pages } = state;
	const { iteration, page } = pager;
	const { subPages } = pages[page];

	return {
		...state,
		pager: { ...pager, subPage: subPages.length - 1, iteration: iteration - 1 },
	};
}

function goPreviousPage(state, { previous }) {
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

function validateChange(state) {
	if (isOnEmptyPage(state)) {
		return reduceGoPreviousPage(state);
	}

	return state;
}

function reduceGoPreviousPage(state) {
	const { pages, pager, isInLoop } = state;
	const { iteration, subPage } = pager;

	// dans une boucle et l'itération courante n'est pas finie
	if (isInLoop && subPage > 0) {
		return validateChange(goPreviousSubPage(state));
	}
	// dans une boucle, l'itération courante est finie mais il reste encore au moins une autre
	if (isInLoop && subPage === 0 && iteration > 0) {
		return validateChange(goPreviousIteration(state));
	}

	const previous = getPreviousPage(pager);
	const { isLoop, iterations, loopDependencies } = pages[previous];
	// on rentre dans une boucle
	if (isLoop) {
		return validateChange(
			goStartLoop(state, { previous, loopDependencies, iterations })
		);
	}
	// on change de page
	return validateChange(goPreviousPage(state, { previous }));
}

export default reduceGoPreviousPage;
