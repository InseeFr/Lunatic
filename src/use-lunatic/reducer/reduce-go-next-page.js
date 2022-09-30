import { isOnEmptyPage, validateLoopConditionFilter } from './commons';
import { getCompatibleVTLExpression, getNewReachedPage } from '../commons';
import {
	createControlsReducer,
	createModalControlsReducer,
} from './validate-controls';

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
	const { iteration } = pager;
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
	const {
		pages,
		isInLoop,
		pager,
		variables,
		setLoopBindings,
		resetLoopBindings,
	} = state;
	const { iteration, nbIterations, subPage, nbSubPages, page } = pager;

	if (isInLoop && subPage < nbSubPages - 1) {
		return validateChange(reduceNextSubPage(state));
	}
	if (isInLoop && subPage === nbSubPages - 1 && iteration < nbIterations - 1) {
		// New iteration, update loop bindings
		setLoopBindings(variables, iteration + 1);
		return validateChange(reduceNextIteration(state));
	}

	const next = getNextPage(state);
	const { isLoop, iterations, loopDependencies } = pages[next];

	const pageComponents = pages[page].components.map(
		({ componentType }) => componentType
	);

	if ((isInLoop && !isLoop) || pageComponents.includes('PairwiseLinks')) {
		//End of the loop or PairwiseLinks, we reset bindings
		resetLoopBindings(variables);
	}
	if (next === page) {
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
