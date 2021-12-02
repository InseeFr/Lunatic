import { useReducer, useEffect, useCallback } from 'react';
import INITIAL_STATE from './initial-state';
import * as actions from './actions';
import reducer from './reducer';
import {
	getComponentsFromState,
	getPageTag,
	getIsFirstLastPage,
} from './commons';

function useLunatic({ source, data, initialPage }) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { bindings, pager } = state;

	useEffect(
		function () {
			dispatch(actions.onInit({ source, data, initialPage }));
		},
		[source, data]
	);

	const goNextPage = useCallback(
		function () {
			dispatch(actions.goNextPage());
		},
		[dispatch]
	);

	const goPreviousPage = useCallback(function () {}, []);

	const getComponents = useCallback(
		function () {
			return getComponentsFromState(state);
		},
		[state]
	);
	const handleChange = useCallback(
		function (todo) {
			dispatch(actions.handleChange(todo));
		},
		[dispatch]
	);

	const pageTag = getPageTag(pager);
	const { isFirstPage, isLastPage } = getIsFirstLastPage(pager);

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
