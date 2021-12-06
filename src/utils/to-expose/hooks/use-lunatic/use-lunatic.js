import { useReducer, useEffect, useCallback } from 'react';
import INITIAL_STATE from './initial-state';
import * as actions from './actions';
import reducer from './reducer';
import { getComponentsFromState, getPageTag, isFirstLastPage } from './commons';

function useLunatic({ source, data, initialPage, features }) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { bindings, pager } = state;

	useEffect(
		function () {
			dispatch(actions.onInit({ source, data, initialPage, features }));
		},
		[source, data, initialPage, features]
	);

	const goNextPage = useCallback(
		function () {
			dispatch(actions.goNextPage());
		},
		[dispatch]
	);

	const goPreviousPage = useCallback(
		function () {
			dispatch(actions.goPreviousPage());
		},
		[dispatch]
	);

	const getComponents = useCallback(
		function () {
			return getComponentsFromState(state);
		},
		[state]
	);
	const handleChange = useCallback(
		function (todo, component) {
			dispatch(actions.handleChange(todo, component));
		},
		[dispatch]
	);

	const pageTag = getPageTag(pager);
	const { isFirstPage, isLastPage } = isFirstLastPage(pager);

	return {
		getComponents,
		handleChange,
		goNextPage,
		goPreviousPage,
		bindings,
		pageTag,
		isFirstPage,
		isLastPage,
		pager,
	};
}

export default useLunatic;
