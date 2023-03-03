import * as actions from './actions';

import {
	FunctionComponent,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
} from 'react';
import { LunaticData, LunaticState } from './type';
import { getPageTag, isFirstLastPage, useComponentsFromState } from './commons';

import { COLLECTED } from '../utils/constants';
import D from '../i18n';
import INITIAL_STATE from './initial-state';
import { LunaticSource } from './type-source';
import { createLunaticProvider } from './lunatic-context';
import { getQuestionnaireData } from './commons/get-data';
// @ts-ignore
import { loadSuggesters } from '../utils/store-tools/auto-load';
import { overviewWithChildren } from './commons/getOverview';
import reducer from './reducer';
import { useLoopVariables } from './hooks/use-loop-variables';

const empty = {}; // Keep the same empty object (to avoid problem with useEffect dependencies)
const DEFAULT_DATA = empty as LunaticData;
const DEFAULT_FEATURES = ['VTL', 'MD'];
const DEFAULT_PREFERENCES = [COLLECTED];
const DEFAULT_SHORTCUT = { dontKnow: '', refused: '' };

const DEFAULT_DONT_KNOW = D.DK;
const DEFAULT_REFUSED = D.RF;
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
		// Calculate an overview of every sequence (will be exposed as "overview")
		withOverview = false,
		missing = false,
		missingStrategy = () => {},
		missingShortcut = DEFAULT_SHORTCUT,
		dontKnowButton = DEFAULT_DONT_KNOW,
		refusedButton = DEFAULT_REFUSED,
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
		withOverview?: boolean;
		missing?: boolean;
		missingStrategy?: () => void;
		missingShortcut?: { dontKnow: string; refused: string };
		dontKnowButton?: string;
		refusedButton?: string;
	}
) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { pager, waiting, modalErrors, errors, currentErrors, overview } =
		state;
	const components = useComponentsFromState(state);
	const { suggesters } = source;

	// Required context provider: cleaner than prop drilling through every component
	const Provider = useMemo(
		() =>
			createLunaticProvider({
				custom,
				management,
				missing,
				missingStrategy,
				shortcut,
				missingShortcut,
				dontKnowButton,
				refusedButton,
			}),
		[
			custom,
			management,
			missing,
			missingStrategy,
			shortcut,
			missingShortcut,
			dontKnowButton,
			refusedButton,
		]
	);

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

	const buildedOverview = useMemo(
		() => overviewWithChildren(overview),
		[overview]
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
					shortcut,
					handleChange,
					activeControls,
					goToPage,
					withOverview,
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
			shortcut,
			handleChange,
			activeControls,
			withOverview,
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
		overview: buildedOverview,
		loopVariables: useLoopVariables(pager, state.pages),
	};
}

export default useLunatic;
