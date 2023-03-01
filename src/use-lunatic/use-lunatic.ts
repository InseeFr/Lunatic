import {
	useReducer,
	useEffect,
	useCallback,
	FunctionComponent,
	useMemo,
} from 'react';
import INITIAL_STATE from './initial-state';
import * as actions from './actions';
import reducer from './reducer';
import { useComponentsFromState, getPageTag, isFirstLastPage } from './commons';
import { COLLECTED } from '../utils/constants';
// @ts-ignore
import { useSuggesters } from './use-suggesters';
import { getQuestionnaireData } from './commons/get-data';
import { LunaticData, LunaticState } from './type';
import { LunaticSource } from './type-source';
import { createLunaticProvider } from './lunatic-context';

const DEFAULT_DATA = {} as LunaticData;
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
		activeControls = false,
		custom,
		getReferentiel,
	}: {
		features: string[];
		preferences: string[];
		savingType: string;
		onChange: typeof nothing;
		management: boolean;
		shortcut: boolean;
		initialPage: string;
		autoSuggesterLoading: boolean;
		getReferentiel: (name: string) => Promise<Array<unknown>>;
		activeControls: boolean;
		custom: Record<string, FunctionComponent<unknown>>;
	}
) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { pager, waiting, modalErrors, errors, currentErrors } = state;
	const components = useComponentsFromState(state);
	const { suggesters } = source;
	const Provider = useMemo(() => createLunaticProvider(custom), [custom]);

	const getSuggesterStatus = useSuggesters({
		auto: autoSuggesterLoading,
		getReferentiel,
		suggesters,
	});

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
					handleChange,
					activeControls,
					goToPage,
					getSuggesterStatus,
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
			goToPage,
			getSuggesterStatus,
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
