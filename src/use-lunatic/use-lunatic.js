<<<<<<< HEAD
import { useCallback, useReducer, useEffect } from 'react';
import { reducer, initialState, actions } from './state-management';
import { getPageTag } from './commons';

function useLunatic({ source, initialPage }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { pages, pager } = state;
	const pageTag = getPageTag(pager);
	console.log({ pages });
	useEffect(
		function () {
			if (source) {
				dispatch(actions.onInit({ source }));
			}
		},
		[source]
	);

	const getComponents = useCallback(function () {
		return [];
	}, []);

	const getNext = useCallback(
		function () {
			dispatch(actions.goNext());
		},
		[dispatch]
	);

	const getPrevious = useCallback(
		function () {
			dispatch(actions.goPrevious());
=======
import { useReducer, useEffect, useCallback } from 'react';
import INITIAL_STATE from './initial-state';
import * as actions from './actions';
import reducer from './reducer';
import { loadSuggester } from './commons';
import { useComponentsFromState, getPageTag, isFirstLastPage } from './commons';

function nothing() {}

function useLunatic({
	source,
	data,
	initialPage,
	features,
	preferences,
	onChange = nothing,
}) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { pager, waiting, errors } = state;
	const components = useComponentsFromState(state);
	const { suggesters } = source;

	useEffect(
		function () {
			async function doIt() {
				if (suggesters) {
					dispatch(actions.onSetWaiting(true));
					const status = await loadSuggester(suggesters);
					dispatch(actions.onSetWaiting(false));
				}
			}
			doIt();
		},
		[suggesters]
	);

	const goNextPage = useCallback(
		function (payload = {}) {
			dispatch(actions.goNextPage(payload));
		},
		[dispatch]
	);

	const getErrors = useCallback(
		function () {
			return errors;
		},
		[errors]
	);

	const goPreviousPage = useCallback(
		function () {
			dispatch(actions.goPreviousPage());
>>>>>>> optimisation
		},
		[dispatch]
	);

<<<<<<< HEAD
	const handleChange = useCallback(
		function (respons, value, args) {
			dispatch(actions.handleChange(respons, value, args));
		},
		[dispatch]
	);

	return { getComponents, getNext, getPrevious, handleChange, pageTag };
=======
	const getComponents = useCallback(
		function () {
			// validate variables ?
			return components;
		},
		[components]
	);
	const handleChange = useCallback(
		function (response, value, args) {
			dispatch(actions.handleChange(response, value, args));
			onChange(response, value, args);
		},
		[dispatch, onChange]
	);

	const pageTag = getPageTag(pager);
	const { isFirstPage, isLastPage } = isFirstLastPage(pager);

	useEffect(
		function () {
			dispatch(
				actions.onInit({
					source,
					data,
					initialPage,
					features,
					preferences,
					handleChange,
				})
			);
		},
		[source, data, initialPage, features, preferences, handleChange]
	);

	return {
		getComponents,
		goNextPage,
		goPreviousPage,
		getErrors,
		pageTag,
		isFirstPage,
		isLastPage,
		pager,
		waiting,
	};
>>>>>>> optimisation
}

export default useLunatic;
