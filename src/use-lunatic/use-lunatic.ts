import { useCallback, useMemo, useReducer } from 'react';
import {
	goToPageAction,
	goNextPageAction,
	goPreviousPageAction,
	handleChangesAction,
} from './actions';
import { getPageTag, isFirstLastPage } from './commons';
import type {
	LunaticChangesHandler,
	LunaticData,
	LunaticOptions,
	LunaticState,
	PageTag,
} from './type';
import D from '../i18n';
import { COLLECTED } from '../utils/constants';
import { createLunaticProvider } from './lunatic-context';
import type { LunaticSource } from './type';
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
import { useFillers } from './hooks/useFillers';

const empty = {}; // Keep the same empty object (to avoid problem with useEffect dependencies)
const DEFAULT_DATA = empty as LunaticData;
const DEFAULT_FEATURES = ['VTL', 'MD'] as ['VTL', 'MD'];
const DEFAULT_PREFERENCES = [COLLECTED] as ['COLLECTED'];
const DEFAULT_SHORTCUT = { dontKnow: '', refused: '' };

const DEFAULT_DONT_KNOW = D.DK;
const DEFAULT_REFUSED = D.RF;

const defaultOptions = {
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
} satisfies LunaticOptions;

export function useLunatic(
	source: LunaticSource,
	data: LunaticData = DEFAULT_DATA,
	argOptions: LunaticOptions = empty
) {
	const options = mergeDefault(argOptions, defaultOptions);
	const {
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
		mocks,
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

	// Required context provider: cleaner than prop drilling through every component
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
			}),
		[
			management,
			missing,
			missingStrategy,
			shortcut,
			missingShortcut,
			dontKnowButton,
			refusedButton,
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

	const handleChanges = useCallback<LunaticChangesHandler>(
		(responses) => {
			dispatch(handleChangesAction(responses));
			onChange(responses);
		},
		[dispatch, onChange]
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

	const pageTag = getPageTag(state.pager);
	const { isFirstPage, isLastPage } = isFirstLastPage(state.pager);

	const { triggerFillers, isFilling } = useFillers({
		variables: state.variables,
		fillers: source.fillers ?? [],
		handleChanges,
		fetchMock: mocks?.filler ?? null,
	});

	const goNextPage: LunaticState['goNextPage'] = useCallback(
		function (payload = {}) {
			dispatch(goNextPageAction(payload));
			triggerFillers();
		},
		[dispatch]
	);

	const goToPage: LunaticState['goToPage'] = useCallback(
		function (payload) {
			dispatch(goToPageAction(payload));
		},
		[dispatch]
	);

	const components = fillComponents(getComponentsFromState(state), {
		handleChanges,
		preferences,
		goToPage,
		shortcut,
		goNextPage,
		goPreviousPage,
		management,
		...state,
	});

	const getComponents: LunaticState['getComponents'] = () => {
        if (isFilling) {
            return [
                {
                    componentType: 'FillerLoader',
                },
            ];
        }
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
		testing: {
			handleChanges,
		},
	} satisfies LunaticState;
}
