import { useCallback, useEffect, useMemo, useReducer } from 'react';
import * as actions from './actions';
import { getPageTag, isFirstLastPage } from './commons';
import type {
	LunaticChangeHandler,
	LunaticData,
	LunaticOptions,
	LunaticState,
	PageTag,
} from './type';
import D from '../i18n';
import { COLLECTED } from '../utils/constants';
import { createLunaticProvider } from './lunatic-context';
import type { LunaticSource } from './type-source';
import { compileControls as compileControlsLib } from './commons/compile-controls';
import { useLoopVariables } from './hooks/use-loop-variables';
import { getQuestionnaireData } from './commons/variables/get-questionnaire-data';
import { useTrackChanges } from '../hooks/use-track-changes';
import { usePageHasResponse } from './hooks/use-page-has-response';
import { registerSuggesters } from '../utils/search/SuggestersDatabase';
import { useRefSync } from '../hooks/useRefSync';
import { useOverview } from './hooks/useOverview';
import { reducerInitializer } from './reducer/reducerInitializer';
import { getComponentsFromState } from './commons/get-components-from-state';
import { fillComponents } from './commons/fill-components/fill-components';
import { reducer } from './reducer/reducer';

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
} satisfies LunaticOptions;

function useLunatic(
	source: LunaticSource,
	data: LunaticData = DEFAULT_DATA,
	argOptions: LunaticOptions
) {
	const options = {
		...defaultOptions,
		...argOptions,
	};
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
	} = options;
	const [state, dispatch] = useReducer(
		reducer,
		{ ...options, source, data },
		reducerInitializer
	);
	const getReferentielRef = useRefSync(options.getReferentiel);

	// Register the list of suggesters
	useEffect(() => {
		if (source.suggesters && getReferentielRef.current) {
			registerSuggesters(source.suggesters ?? [], getReferentielRef.current);
		}
	}, [source.suggesters, getReferentielRef]);

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
			dispatch(actions.goPreviousPage());
		},
		[dispatch]
	);

	const goNextPage: LunaticState['goNextPage'] = useCallback(
		function (payload = {}) {
			dispatch(actions.goNextPage(payload));
		},
		[dispatch]
	);

	const goToPage: LunaticState['goToPage'] = useCallback(
		function (payload) {
			dispatch(actions.goToPage(payload));
		},
		[dispatch]
	);
	const handleChange = useCallback<LunaticChangeHandler>(
		(response, value, args) => {
			dispatch(
				actions.handleChange(
					typeof response === 'string' ? response : response.name,
					value,
					args?.iteration
				)
			);
			onChange(response, value, args);
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

	const components = fillComponents(getComponentsFromState(state), {
		handleChange,
		preferences,
		goToPage,
		shortcut,
		goNextPage,
		goPreviousPage,
		management,
		...state,
	});

	const getComponents: LunaticState['getComponents'] = ({
		only,
		except,
	} = {}) => {
		if (only && except) {
			throw new Error(
				'"only" and "except" cannot be used together in getComponents()'
			);
		}
		if (only) {
			return components.filter((c) => only.includes(c.componentType ?? ''));
		}
		if (except) {
			return components.filter((c) => !except.includes(c.componentType ?? ''));
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
			handleChange,
		},
	} satisfies LunaticState;
}

export default useLunatic;
