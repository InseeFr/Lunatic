import { useCallback, useEffect, useMemo, useReducer } from 'react';
import * as actions from './actions';
import { getPageTag, isFirstLastPage, useComponentsFromState } from './commons';
import type { LunaticData, LunaticState, PageTag } from './type';
import D from '../i18n';
import { COLLECTED } from '../utils/constants';
import INITIAL_STATE from './initial-state';
import { createLunaticProvider } from './lunatic-context';
import type { LunaticSource } from './type-source';
import type { LunaticComponentProps } from '../components/type';
import { compileControls as compileControlsLib } from './commons/compile-controls';
import { useLoopVariables } from './hooks/use-loop-variables';
import reducer from './reducer';
import { getQuestionnaireData } from './commons/variables/get-questionnaire-data';
import { useTrackChanges } from '../hooks/use-track-changes';
import { usePageHasResponse } from './hooks/use-page-has-response';
import { registerSuggesters } from '../utils/search/SuggestersDatabase';
import type { IndexEntry } from '../utils/search/SearchInterface';
import { useRefSync } from '../hooks/useRefSync';
import { useOverview } from './hooks/useOverview';

const empty = {}; // Keep the same empty object (to avoid problem with useEffect dependencies)
const emptyFn = () => {};
const DEFAULT_DATA = empty as LunaticData;
const DEFAULT_FEATURES = ['VTL', 'MD'] as ['VTL', 'MD'];
const DEFAULT_PREFERENCES = [COLLECTED] as ['COLLECTED'];
const DEFAULT_SHORTCUT = { dontKnow: '', refused: '' };

const DEFAULT_DONT_KNOW = D.DK;
const DEFAULT_REFUSED = D.RF;
const nothing = () => {};

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
		lastReachedPage = undefined,
		autoSuggesterLoading = false,
		activeControls = false,
		getReferentiel,
		// Calculate an overview of every sequence (will be exposed as "overview")
		withOverview = false,
		missing = false,
		missingStrategy = emptyFn,
		missingShortcut = DEFAULT_SHORTCUT,
		dontKnowButton = DEFAULT_DONT_KNOW,
		refusedButton = DEFAULT_REFUSED,
		trackChanges = false,
	}: {
		features?: LunaticState['features'];
		preferences?: LunaticState['preferences'];
		savingType?: LunaticState['savingType'];
		onChange?: LunaticState['handleChange'];
		management?: boolean;
		shortcut?: boolean;
		initialPage?: PageTag;
		lastReachedPage?: PageTag;
		autoSuggesterLoading?: boolean;
		getReferentiel?: (name: string) => Promise<Array<IndexEntry>>;
		activeControls?: boolean;
		withOverview?: boolean;
		missing?: boolean;
		missingStrategy?: () => void;
		missingShortcut?: { dontKnow: string; refused: string };
		dontKnowButton?: string;
		refusedButton?: string;
		// Enable change tracking to keep a track of what variable changed (allow using getChangedData())
		trackChanges?: boolean;
	}
) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { pager, waiting, overview, pages, executeExpression, isInLoop } =
		state;
	const components = useComponentsFromState(state);
	const getReferentielRef = useRefSync(getReferentiel);

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

	const compileControls = useCallback(
		function () {
			return compileControlsLib({ pager, pages, isInLoop, executeExpression });
		},
		[pager, pages, isInLoop, executeExpression]
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

	const goToPage: LunaticState['goToPage'] = useCallback(
		function (payload) {
			dispatch(actions.goToPage(payload));
		},
		[dispatch]
	);

	const getComponents = useCallback(
		function ({
			only,
			except,
		}: {
			only?: LunaticComponentProps['componentType'];
			except?: LunaticComponentProps['componentType'];
		} = {}) {
			if (only && except) {
				throw new Error(
					'"only" and "except" cannot be used together in getComponents()'
				);
			}
			if (only) {
				return components.filter((c) => only.includes(c.componentType ?? ''));
			}
			if (except) {
				return components.filter(
					(c) => !except.includes(c.componentType ?? '')
				);
			}
			return components;
		},
		[components]
	);
	const handleChange = useCallback<LunaticState['handleChange']>(
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

	const getData = (
		withRefreshedCalculated: boolean,
		variableNames?: string[]
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

	const pageTag = getPageTag(pager);
	const { isFirstPage, isLastPage } = isFirstLastPage(pager);

	useEffect(
		function () {
			dispatch(
				actions.onInit({
					source,
					data,
					initialPage,
					lastReachedPage,
					features,
					preferences,
					savingType,
					management,
					shortcut,
					handleChange,
					activeControls,
					goToPage,
					goNextPage,
					goPreviousPage,
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
			goNextPage,
			goPreviousPage,
			lastReachedPage,
		]
	);

	return {
		getComponents,
		goPreviousPage,
		goNextPage,
		goToPage,
		compileControls,
		pageTag,
		isFirstPage,
		isLastPage,
		pager,
		waiting,
		getData,
		Provider,
		onChange: handleChange,
		overview: useOverview(
			{
				executeExpression,
				overview,
				pager,
			},
			[pageTag]
		),
		loopVariables: useLoopVariables(pager, state.pages),
		getChangedData,
		resetChangedData,
		hasPageResponse: usePageHasResponse(components, executeExpression),
	};
}

export default useLunatic;
