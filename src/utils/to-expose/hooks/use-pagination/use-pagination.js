import { useCallback, useReducer } from 'react';
import checkLoops from './check-loops';
import createPages from './create-page';
import reducer from './reducer';
import * as actions from './actions';

const INITIAL = {
	page: '1',
	name: '1',
	maxPage: '1',
	inLoop: false,
	pages: {},
};

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
			return { ...state, pages, maxPage };
		}
		return state;
	});
	const { page, pages, step, inLoop, name } = state;
	const isFirst = page === '1';
	const isLast = page === maxPage;

	const getComponents = useCallback(
		function () {
			if (page in pages) {
				const current = pages[page];
				if (inLoop) {
					const { subPages } = current;
					const stepName = subPages[step];
					if (stepName in pages) {
						const currentSub = pages[stepName];
						const { components } = currentSub;
						return components;
					}
				} else {
					const { components } = current;
					return components;
				}
			}

			return [];
		},
		[page, pages, inLoop, step]
	);

	const goNext = useCallback(function () {
		dispatch(actions.goNext());
	}, []);

	const goPrevious = useCallback(function () {}, []);

	return { getComponents, page, goNext, goPrevious, isFirst, isLast, name };
}

export default usePagination;
