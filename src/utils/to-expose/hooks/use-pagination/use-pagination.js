import { useCallback, useReducer } from 'react';
import checkLoops from './check-loops';
import createPages from './create-page';
import reducer from './reducer';
import * as actions from './actions';

const INITIAL = {
	page: '1',
	subPage: undefined,
	nbSubPages: undefined,
	iteration: undefined,
	nbIterations: undefined,
	name: '1',
	maxPage: '1',
	inLoop: false,
	pages: {},
	bindings: {},
};

function getPageTag(page, subPage, iteration) {
	if (subPage !== undefined && iteration !== undefined) {
		return `${page}.${subPage + 1}#${iteration + 1}`;
	}

	return `${page}`;
}

/**
 *
 * @param {*} questionnaire
 * @returns
 */
function usePagination({ questionnaire, initialPage = '1', bindings } = {}) {
	const { maxPage } = questionnaire;
	const [state, dispatch] = useReducer(reducer, INITIAL, function (state) {
		const { maxPage, components } = questionnaire;
		if (Array.isArray(components) && components.length && maxPage) {
			const pages = checkLoops(createPages(components));
			return { ...state, pages, maxPage, bindings };
		}
		return state;
	});
	const { page, subPage, iteration, inLoop, pages } = state;
	const isFirst = page === '1';
	const isLast = page === maxPage;
	const pageTag = getPageTag(page, subPage, iteration);

	const getComponents = useCallback(
		function () {
			if (page in pages) {
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
		},
		[page, pages, inLoop, subPage]
	);

	const goNext = useCallback(function () {
		dispatch(actions.goNext());
	}, []);

	const goPrevious = useCallback(function () {}, []);

	return { getComponents, page, goNext, goPrevious, isFirst, isLast, pageTag };
}

export default usePagination;
