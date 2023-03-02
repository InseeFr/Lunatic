import * as actions from './actions';

import {
	FunctionComponent,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
} from 'react';
import { getPageTag, isFirstLastPage, useComponentsFromState } from './commons';
import { LunaticData, LunaticState } from './type';

import { COLLECTED } from '../utils/constants';
import { getQuestionnaireData } from './commons/get-data';
import INITIAL_STATE from './initial-state';
import { createLunaticProvider } from './lunatic-context';
import { LunaticSource } from './type-source';
// @ts-ignore
import { loadSuggesters } from '../utils/store-tools/auto-load';
import reducer from './reducer';

const empty = {}; // Keep the same empty object (to avoid problem with useEffect dependencies)
const DEFAULT_DATA = empty as LunaticData;
const DEFAULT_FEATURES = ['VTL', 'MD'];
const DEFAULT_PREFERENCES = [COLLECTED];
const nothing: LunaticState['handleChange'] = () => {};

function useLunatic(
	source: LunaticSource,
	data: LunaticData = DEFAULT_DATA,
	{
		features = DEFAULT_FEATURES,
		preferences = DEFAULT_PREFERENCES,
		savingType = COLLECTED,
		onChange = nothing,
		management = false,
		shortcut = false,
		initialPage = '1',
		autoSuggesterLoading = false,
		suggesters: suggestersConfiguration,
		suggesterFetcher,
		activeControls = false,
		custom = empty,
		autofocus = false,
	}: {
		features?: string[];
		preferences?: string[];
		savingType?: string;
		onChange?: typeof nothing;
		management?: boolean;
		shortcut?: boolean;
		initialPage?: string;
		autoSuggesterLoading?: boolean;
		suggesters?: Record<
			string,
			{ version?: string; fields?: string[]; stopWords: string[]; url: string }
		>;
		suggesterFetcher?: typeof fetch;
		activeControls?: boolean;
		custom?: Record<string, FunctionComponent<unknown>>;
		autofocus?: boolean;
	}
) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { pager, waiting, modalErrors, errors, currentErrors } = state;
	const components = useComponentsFromState(state);
	const { suggesters } = source;
	const Provider = useMemo(() => createLunaticProvider(custom), [custom]);

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
				}, {} as Record<string, { url: string; stopWords: string[] }>);
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
	const handleChange = useCallback<LunaticState['handleChange']>(
		(response, value, args) => {
			dispatch(actions.handleChange(response, value, args));
			onChange(response, value, args);
		},
		[dispatch, onChange]
	);

	const getData = (withRefreshedCalculated: boolean) => {
		const { variables } = state;
		return getQuestionnaireData({ variables, withRefreshedCalculated });
	};

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
					shortcut,
					autofocus,
					handleChange,
					activeControls,
					goToPage,
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
			autofocus,
			shortcut,
			handleChange,
			activeControls,
			goToPage,
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
		pageTag,
		isFirstPage,
		isLastPage,
		pager,
		waiting,
		getData,
		Provider,
	};
}

export default useLunatic;
