import { useCallback, useEffect, useReducer } from 'react';
import checkLoops from './check-loops';
import createPages from './create-page';
import reducer from './reducer';
import * as actions from './actions';
import INITIAL_STATE from './initial-state';

const BLANK = {
	getComponents: () => [],
	pager: {},
};

function getPageTag(state) {
	const { page, subPage, iteration } = state;
	if (subPage !== undefined && iteration !== undefined) {
		return `${page}.${subPage + 1}#${iteration + 1}`;
	}

	return `${page}`;
}

function getComponentsFromState(state) {
	const { page, subPage, pages, inLoop } = state;
	if (page && pages && page in pages) {
		const current = pages[page];
		if (inLoop) {
			const { subPages } = current;
			const stepName = subPages[subPage];
			if (stepName in pages) {
				const currentSubPage = pages[stepName];
				const { components } = currentSubPage;
				return components;
			}
		} else {
			const { components } = current;
			return components;
		}
	}

	return [];
}

/**
 *
 * @param {*} questionnaire
 * @returns
 */
function usePagination({ questionnaire, initialPage = '1', bindings } = {}) {
	const { maxPage } = questionnaire;
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	useEffect(
		function () {
			dispatch(actions.onInit({ questionnaire, bindings, initialPage }));
		},
		[questionnaire, bindings, initialPage]
	);

	const { page, subPage, iteration, nbIterations, nbSubPages } = state;
	const isFirst = page === '1';
	const isLast = page === maxPage;
	const pageTag = getPageTag(state);

	const getComponents = useCallback(
		() => getComponentsFromState(state),
		[state]
	);

	const goNext = useCallback(function () {
		dispatch(actions.goNext());
	}, []);

	const goPrevious = useCallback(function () {}, []);
	const pager = {
		isFirst,
		isLast,
		pageTag,
		page,
		subPage,
		nbSubPages,
		iteration,
		nbIterations,
	};

	return { getComponents, page, goNext, goPrevious, pager };
}

export default usePagination;
