import { getCompatibleVTLExpression } from '../commons';
import { LunaticState } from '../type';
import { isOnEmptyPage } from './commons';
import { reduceToRoundabout } from './reduce-roundabout';

function getPreviousPage(pager: LunaticState['pager']): string {
	const { page } = pager;
	const p = Number.parseInt(page);
	if (p > 1) {
		return `${parseInt(page, 10) - 1}`;
	}
	return page;
}

function goStartLoop(
	state: LunaticState,
	{
		previous,
		iterations,
		loopDependencies,
	}: { previous: string; iterations: string; loopDependencies?: string[] }
) {
	const { pages, pager, executeExpression } = state;
	const { subPages } = pages[previous];

	//TODO: check if loop components are all filtered

	if (Array.isArray(subPages)) {
		const nbIterations = executeExpression<number>(
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

function goPreviousSubPage(state: LunaticState) {
	const { pager } = state;
	const { subPage } = pager;

	return {
		...state,
		pager: { ...pager, subPage: subPage ? subPage - 1 : subPage },
	};
}

function goPreviousIteration(state: LunaticState) {
	const { pager, pages } = state;
	const { iteration, page, roundabout } = pager;

	if (roundabout) {
		return reduceToRoundabout(state);
	}

	const { subPages } = pages[page];

	return {
		...state,
		pager: {
			...pager,
			subPage: (subPages ?? []).length - 1,
			iteration: (iteration ?? 0) - 1,
		},
	};
}

function goPreviousPage(
	state: LunaticState,
	{ previous }: { previous: string }
) {
	const { pager } = state;
	const { page } = pager;
	const updatedPager = {
		...pager,
		page: previous,
		iteration: undefined,
		nbIterations: undefined,
		subPage: undefined,
		nbSubPages: undefined,
		shallowIteration: undefined,
	};

	if (previous !== page) {
		return {
			...state,
			isInLoop: false,
			pager: updatedPager,
		};
	}

	return state;
}

function validateChange(state: LunaticState): LunaticState {
	const { pager } = state;
	const updatedState = { ...state };
	if (isOnEmptyPage(updatedState)) {
		return reduceGoPreviousPage(updatedState);
	}
	return updatedState;
}

function reduceGoPreviousPage(state: LunaticState): LunaticState {
	const { pages, pager, isInLoop, variables } = state;
	const { iteration, subPage, roundabout, nbIterations } = pager;

	// dans une boucle et l'itération courante n'est pas finie
	if (isInLoop && subPage && subPage > 0) {
		return validateChange(goPreviousSubPage(state));
	}
	// dans une boucle, l'itération courante est finie mais il reste encore au moins une autre
	if (isInLoop && subPage === 0 && iteration && iteration > 0) {
		return validateChange(goPreviousIteration(state));
	}

	if (roundabout && nbIterations && nbIterations > 1) {
		return reduceToRoundabout(state);
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
