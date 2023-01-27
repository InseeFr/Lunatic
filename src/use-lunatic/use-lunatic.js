import * as actions from './actions';

import { getPageTag, isFirstLastPage, useComponentsFromState } from './commons';
import { useCallback, useEffect, useMemo, useReducer } from 'react';

import { COLLECTED } from '../utils/constants';
import INITIAL_STATE from './initial-state';
import { buildBreadcrumb } from './commons/getBreadcrumb';
import { getQuestionnaireData } from './commons/get-data';
import { loadSuggesters } from '../utils/store-tools/auto-load';
import reducer from './reducer';

const DEFAULT_DATA = {};
const DEFAULT_FEATURES = ['VTL', 'MD'];
const DEFAULT_PREFERENCES = [COLLECTED];
function nothing() {}

function useLunatic(
	source,
	data = DEFAULT_DATA,
	{
		features = DEFAULT_FEATURES,
		preferences = DEFAULT_PREFERENCES,
		savingType = COLLECTED,
		onChange = nothing,
		management = false,
		initialPage = '1',
		autoSuggesterLoading = false,
		suggesters: suggestersConfiguration,
		suggesterFetcher,
		activeControls = false,
	}
) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { pager, waiting, modalErrors, errors, currentErrors, breadcrumb } =
		state;
	const components = useComponentsFromState(state);
	const { suggesters } = source;

	useEffect(() => {
		(async () => {
			if (
				autoSuggesterLoading &&
				typeof suggestersConfiguration === 'object' &&
				Object.values(suggestersConfiguration).length > 0
			) {
				const s = suggesters.reduce(function (current, storeInfo) {
					const { name } = storeInfo;
					if (!suggestersConfiguration[name]) return current;
					return {
						...current,
						[name]: {
							...storeInfo,
							url: suggestersConfiguration[name].url,
							stopWords: suggestersConfiguration[name].stopWords,
						},
					};
				}, {});
				dispatch(actions.onSetWaiting(true));
				await loadSuggesters(suggesterFetcher)(s);
				dispatch(actions.onSetWaiting(false));
			}
		})();
	}, [
		autoSuggesterLoading,
		suggesterFetcher,
		suggestersConfiguration,
		suggesters,
	]);

	const getErrors = useCallback(
		function () {
			return errors;
		},
		[errors]
	);

	const getModalErrors = useCallback(
		function () {
			return modalErrors;
		},
		[modalErrors]
	);

	const getCurrentErrors = useCallback(
		function () {
			return currentErrors;
		},
		[currentErrors]
	);

	const goPreviousPage = useCallback(
		function () {
			dispatch(actions.goPreviousPage());
		},
		[dispatch]
	);

	const goNextPage = useCallback(
		function (payload = {}) {
			dispatch(actions.goNextPage(payload));
		},
		[dispatch]
	);

	const goToPage = useCallback(
		function (payload = {}) {
			dispatch(actions.goToPage(payload));
		},
		[dispatch]
	);

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

	const getData = (withRefreshedCalculated) => {
		const { variables } = state;
		return getQuestionnaireData({ variables, withRefreshedCalculated });
	};

	const buildedBreadcrumb = useMemo(
		() => buildBreadcrumb(breadcrumb),
		[breadcrumb]
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
					savingType,
					management,
					handleChange,
					activeControls,
				})
			);
		},
		[
			source,
			data,
			initialPage,
			features,
			preferences,
			savingType,
			management,
			handleChange,
			activeControls,
		]
	);

	return {
		getComponents,
		goPreviousPage,
		goNextPage,
		goToPage,
		getErrors,
		getModalErrors,
		getCurrentErrors,
		breadcrumb: buildedBreadcrumb,
		pageTag,
		isFirstPage,
		isLastPage,
		pager,
		waiting,
		getData,
	};
}

export default useLunatic;
