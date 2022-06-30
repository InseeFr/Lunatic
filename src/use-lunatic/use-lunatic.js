import { useReducer, useEffect, useCallback } from 'react';
import INITIAL_STATE from './initial-state';
import * as actions from './actions';
import reducer from './reducer';
import { useComponentsFromState, getPageTag, isFirstLastPage } from './commons';
import { COLLECTED } from 'utils/constants';
import { loadSuggesters } from '../../store-tools/auto-load';

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
		suggestersConfiguration,
		suggesterFetcher,
	}
) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { pager, waiting, errors } = state;
	const components = useComponentsFromState(state);
	const { suggesters } = source;

	useEffect(() => {
		const init = async () => {
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
				const status = await loadSuggesters(suggesterFetcher)(s);
				dispatch(actions.onSetWaiting(false));
			}
		};

		init();
	}, [
		autoSuggesterLoading,
		suggesterFetcher,
		suggestersConfiguration,
		suggesters,
	]);

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
		]
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
}

export default useLunatic;
