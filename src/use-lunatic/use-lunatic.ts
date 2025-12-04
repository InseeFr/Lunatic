import { useCallback, useMemo, useReducer } from 'react';
import {
	goToPageAction,
	goNextPageAction,
	goPreviousPageAction,
	handleChangesAction,
} from './actions';
import { getPageTag, isFirstLastPage } from './commons';

import D from '../i18n';
import { COLLECTED } from '../utils/constants';
import { createLunaticProvider } from './lunatic-context';
import type {
	LunaticSource,
	LunaticChangesHandler,
	LunaticData,
	LunaticOptions,
	LunaticState,
	PageTag,
} from './type';
import { compileControls as compileControlsLib } from './commons/compile-controls';
import { useLoopVariables } from './hooks/use-loop-variables';
import { getQuestionnaireData } from './commons/variables/get-questionnaire-data';
import { useTrackChanges } from '../hooks/use-track-changes';
import { usePageHasResponse } from './hooks/use-page-has-response';
import { useOverview } from './hooks/useOverview';
import { reducerInitializer } from './reducer/reducerInitializer';
import { getComponentsFromState } from './commons/get-components-from-state';
import { fillComponents } from './commons/fill-components/fill-components';
import { reducer } from './reducer/reducer';
import { mergeDefault } from '../utils/object';
import { useRefSync } from '../hooks/useRefSync';
import { ConsoleLogger } from './logger/ConsoleLogger';
import { useWarnDepChange } from './hooks/useWarnDepChange';
import { useCallbackOnNextRender } from './hooks/useCallbackOnNextRender';
import { useMultimode } from '../hooks/useMultimode';

const empty = {}; // Keep the same empty object (to avoid problem with useEffect dependencies)
const DEFAULT_DATA = empty as LunaticData;
const DEFAULT_FEATURES = ['VTL', 'MD'] as ['VTL', 'MD'];
const DEFAULT_PREFERENCES = [COLLECTED] as ['COLLECTED'];
const DEFAULT_SHORTCUT = { dontKnow: '', refused: '' };

const DEFAULT_DONT_KNOW = D.DK;
const DEFAULT_REFUSED = D.RF;

const defaultOptions = {
	disableFilters: false,
	disableFiltersDescription: true,
	features: DEFAULT_FEATURES,
	preferences: DEFAULT_PREFERENCES,
	savingType: COLLECTED,
	onChange: () => {},
	onVariableChange: () => {},
	management: false,
	shortcut: false,
	initialPage: '1' as PageTag,
	lastReachedPage: undefined,
	autoSuggesterLoading: false,
	activeControls: false,
	// Calculate an overview of every sequence (will be exposed as "overview")
	withOverview: false,
	missing: false,
	missingStrategy: () => {},
	missingShortcut: DEFAULT_SHORTCUT,
	dontKnowButton: DEFAULT_DONT_KNOW,
	refusedButton: DEFAULT_REFUSED,
	trackChanges: false,
	logger: ConsoleLogger,
	componentsOptions: {
		detailAlwaysDisplayed: false,
		disableRosterForLoopDeleteRowButton: false,
	},
} satisfies LunaticOptions;

/** The first library entrypoint is the `useLunatic` hook. */
export function useLunatic(
	/**
	 * JSON representation of our survey unit in the Lunatic Model.
	 *
	 * {@link https://github.com/InseeFr/Lunatic-Model}
	 */
	source: LunaticSource,
	/** Initial survey data (i.e. if it has been partially filled). */
	data: LunaticData = DEFAULT_DATA,
	/** Specific behaviour options. */
	argOptions: LunaticOptions = empty
): LunaticState {
	const options = mergeDefault(argOptions, defaultOptions);
	const {
		disableFilters,
		disableFiltersDescription,
		management,
		missing,
		missingStrategy,
		shortcut,
		missingShortcut,
		dontKnowButton,
		refusedButton,
		onChange,
		trackChanges,
		preferences,
		logger,
		componentsOptions,
	} = options;

	// Help debug with warnings for options expected to be memoized
	useWarnDepChange(
		logger,
		"'logger' option should not change between render",
		logger
	);

	const [state, dispatch] = useReducer(
		reducer,
		{
			...options,
			source,
			data,
			onVariableChange: useRefSync(options.onVariableChange),
		},
		reducerInitializer
	);

	/** Required context provider: cleaner than prop drilling through every component */
	const Provider = useMemo(
		() =>
			createLunaticProvider({
				management,
				missing,
				missingStrategy,
				shortcut,
				missingShortcut,
				dontKnowButton,
				refusedButton,
				componentsOptions,
			}),
		/* eslint-disable-next-line react-hooks/exhaustive-deps -- object deps are not being handled very well by useMemo so we need to compare single values */
		[
			management,
			missing,
			missingStrategy,
			shortcut,
			missingShortcut.dontKnow,
			missingShortcut.refused,
			dontKnowButton,
			refusedButton,
			componentsOptions.detailAlwaysDisplayed,
			componentsOptions.disableRosterForLoopDeleteRowButton,
		]
	);

	const compileControls: LunaticState['compileControls'] = () => {
		return compileControlsLib(state);
	};

	const goPreviousPage: LunaticState['goPreviousPage'] = useCallback(
		function () {
			dispatch(goPreviousPageAction());
		},
		[dispatch]
	);

	const goNextPage: LunaticState['goNextPage'] = useCallback(
		function (payload = {}) {
			dispatch(goNextPageAction(payload));
		},
		[dispatch]
	);

	const goToPage: LunaticState['goToPage'] = useCallback(
		function (payload) {
			dispatch(goToPageAction(payload));
		},
		[dispatch]
	);

	const onChangeAfterRender = useCallbackOnNextRender(onChange);

	const handleChanges = useCallback<LunaticChangesHandler>(
		(responses) => {
			dispatch(handleChangesAction(responses));
			onChangeAfterRender(responses);
		},
		[dispatch, onChangeAfterRender]
	);

	const getData: LunaticState['getData'] = (
		withRefreshedCalculated,
		variableNames
	) => {
		return getQuestionnaireData(
			state.variables,
			source.variables,
			withRefreshedCalculated,
			variableNames
		);
	};

	const { resetChangedData, getChangedData } = useTrackChanges(
		trackChanges,
		state.variables,
		(variableNames?: string[]) => getData(false, variableNames)
	);

	const { getMultimode } = useMultimode(source, state.variables);

	const pageTag = getPageTag(state.pager);
	const { isFirstPage, isLastPage } = isFirstLastPage(state.pager);

	const components = fillComponents(getComponentsFromState(state), {
		disableFilters,
		disableFiltersDescription,
		handleChanges,
		preferences,
		goToPage,
		shortcut,
		goNextPage,
		goPreviousPage,
		management,
		logger,
		...state,
	});

	const getComponents: LunaticState['getComponents'] = () => {
		return components;
	};

	return {
		pageTag,
		isFirstPage,
		isLastPage,
		updatedAt: state.updatedAt,
		pager: state.pager,
		isInLoop: state.isInLoop,
		overview: useOverview(state, [pageTag]),
		loopVariables: useLoopVariables(state.pager, state.pages),
		roundaboutLoopVariables: useLoopVariables(
			state.pager,
			state.pages,
			'Roundabout'
		),
		// Methods
		getComponents,
		goPreviousPage,
		goNextPage,
		goToPage,
		compileControls,
		getData,
		getChangedData,
		resetChangedData,
		hasPageResponse: usePageHasResponse(components, state.executeExpression),
		// Components
		Provider,
		handleChanges,
		getMultimode,
	} satisfies LunaticState;
}
