import { useState, useEffect, useCallback, useMemo } from 'react';
import { mergeQuestionnaireAndData } from '../init-questionnaire';
import { getBindings } from '../state';
import { updateQuestionnaire, updateExternals } from '../handler';
import {
	getPage,
	FLOW_NEXT,
	FLOW_PREVIOUS,
	getControls,
	isDev,
	getSplitQuestionnaireSource,
	mergeStateData,
	getRootPageInSources,
} from '../../lib';
import { COLLECTED } from '../../../constants';
import { useFilterComponents } from './filter-components';
import { loadSuggesters } from '../../store-tools/auto-load';
import { getCollectedStateByValueType, getState } from '..';

const defaultData = {};

const useLunaticSplit = (
	source,
	data = defaultData,
	{
		savingType = COLLECTED,
		preferences = [COLLECTED],
		features = ['VTL'],
		management = false,
		pagination = false,
		modalForControls = false,
		initialPage = null,
		logFunction = null,
		autoSuggesterLoading = false,
		suggesterFetcher,
		suggesters,
	}
) => {
	if (isDev) {
		console.log('useLunaticSplit');
		var start = new Date().getTime();
	}
	const [fullQuestionnaire] = useState(() =>
		mergeQuestionnaireAndData(source)(data)
	);
	const sources = useMemo(() => getSplitQuestionnaireSource(source), [source]);
	const allData = useMemo(
		() => getState(fullQuestionnaire),
		[fullQuestionnaire]
	);
	const [allBindings, setAllBindings] = useState(() =>
		getBindings(fullQuestionnaire)
	);

	const rootPagesOfSource = useMemo(
		() => getRootPageInSources(sources),
		[sources]
	);

	const [sourceIndex, setSourceIndex] = useState(0);
	const [lunaticData, setLunaticData] = useState(allData);

	const [initPage, setInitPage] = useState(false);
	const featuresWithoutMD = features.filter((f) => f !== 'MD');

	const [questionnaire, setQuestionnaire] = useState(() =>
		mergeQuestionnaireAndData(sources[sourceIndex])(lunaticData)
	);
	const [bindings, setBindings] = useState(() => getBindings(questionnaire));

	const [wantedPage, setWantedPage] = useState(null);

	// updating current source
	useEffect(() => {
		setInitPage(false);
		const newQ = mergeQuestionnaireAndData(sources[sourceIndex])(lunaticData);
		setQuestionnaire(newQ);
		const bind = getBindings(newQ);
		setBindings(bind);
		setAllBindings({ ...allBindings, ...bind });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sources, sourceIndex]);

	const getBindingsSplit = (quest) => {
		const bind = getBindings(quest);
		return { ...allBindings, ...bind };
	};

	function getStateSplit(quest) {
		const lastState = getState(quest);
		return mergeStateData(lunaticData, lastState);
	}
	const getCollectedStateSplit = (quest) => {
		const lastState = getStateSplit(quest);
		return lastState[COLLECTED];
	};
	const getCollectedStateByValueTypeSplit =
		(quest) => (valueType, displayNull) => {
			return getCollectedStateByValueType(null, getCollectedStateSplit(quest))(
				valueType,
				displayNull
			);
		};

	const [page, setPage] = useState(questionnaire.firstPage);

	const [todo, setTodo] = useState({});
	const [todoExternals, setTodoExternals] = useState({});
	const [modalContent, setModalContent] = useState(null);

	const components = useFilterComponents({
		questionnaire,
		management,
		bindings,
		features: featuresWithoutMD,
		page,
		pagination,
		todo: { ...todo, ...todoExternals },
	});

	const { suggesters: suggestersToLoad } = source;

	useEffect(() => {
		const init = async () => {
			if (
				autoSuggesterLoading &&
				typeof suggesters === 'object' &&
				Object.values(suggesters).length > 0
			) {
				const s = suggestersToLoad.reduce(function (current, storeInfo) {
					const { name } = storeInfo;
					if (!suggesters[name]) return current;
					return {
						...current,
						[name]: {
							...storeInfo,
							url: suggesters[name].url,
							stopWords: suggesters[name].stopWords,
						},
					};
				}, {});
				loadSuggesters(suggesterFetcher)(s);
			}
		};
		init();
	}, [autoSuggesterLoading, suggesterFetcher, suggesters, suggestersToLoad]);

	const [flow, setFlow] = useState(null);

	// TODO: dynamic because of filters (kind of last accessible page)
	const { firstPage, maxPage } = questionnaire;

	const isFirstPage = page === firstPage;
	const isLastPage = page === maxPage;
	const isFirstSource = sourceIndex === 0;
	const isLastSource = sourceIndex === sources.length - 1;

	const goSplitNext = () => {
		if (!isLastSource) {
			const stateData = getState(questionnaire);
			setLunaticData(mergeStateData(lunaticData, stateData));
			setSourceIndex(sourceIndex + 1);
		}
	};

	// First param is the onClick event, useless for us but we have to keep it safe into
	// function signature to avoid confusing with customBindings
	const goNext = (_, customBindings) => {
		if (!(isLastPage && isLastSource)) {
			if (flow !== FLOW_NEXT) {
				setFlow(FLOW_NEXT);
			}
			const nextPage = getPage({
				components: questionnaire.components,
				bindings: customBindings || bindings,
				currentPage: page,
				featuresWithoutMD,
				flow: FLOW_NEXT,
				management,
			});

			const nextFunction = nextPage ? () => setPage(nextPage) : goSplitNext;

			if (modalForControls) {
				const controls = getControls({
					page,
					features: featuresWithoutMD,
					components,
					bindings,
					preferences,
				});
				if (controls.length > 0)
					setModalContent({ confirm: nextFunction, controls });
				else nextFunction();
			} else nextFunction();
		}
	};

	const goSplitPrevious = () => {
		if (!isFirstSource) {
			const stateData = getState(questionnaire);
			setLunaticData(mergeStateData(lunaticData, stateData));
			setSourceIndex(sourceIndex - 1);
		}
	};

	const goPrevious = () => {
		if (!(isFirstPage && isFirstSource)) {
			if (flow !== FLOW_PREVIOUS) {
				setFlow(FLOW_PREVIOUS);
			}
			const previousPage = getPage({
				components: questionnaire.components,
				bindings,
				currentPage: page,
				featuresWithoutMD,
				flow: FLOW_PREVIOUS,
				management,
			});

			const previousFunction = previousPage
				? () => setPage(previousPage)
				: goSplitPrevious;

			if (modalForControls) {
				const controls = getControls({
					page,
					features: featuresWithoutMD,
					components,
					bindings,
					preferences,
				});
				if (controls.length > 0)
					setModalContent({
						confirm: previousFunction,
						controls,
					});
				else previousFunction();
			} else previousFunction();
		}
	};

	const exportedSetPage = useCallback(
		(newPage) => {
			const p = newPage?.split('.')[0];
			const index = rootPagesOfSource.findIndex((pages) => pages.includes(p));
			if (index === sourceIndex) {
				setPage(newPage);
				setWantedPage(null);
			} else {
				// change source
				setWantedPage(newPage);
				const stateData = getState(questionnaire);
				setLunaticData(mergeStateData(lunaticData, stateData));
				setSourceIndex(index);
			}
		},
		[lunaticData, questionnaire, rootPagesOfSource, sourceIndex]
	);

	useEffect(() => {
		if (!initPage) {
			if (wantedPage) {
				setPage(wantedPage);
				setWantedPage(null);
			} else {
				const getNewInitPage = () => {
					if (flow === FLOW_NEXT) {
						const tempPage =
							sourceIndex - 1 > 0
								? sources[sourceIndex - 1].maxPage
								: sources[0].maxPage;
						return getPage({
							components: questionnaire.components,
							bindings: bindings,
							currentPage: tempPage,
							featuresWithoutMD,
							flow: FLOW_NEXT,
							management,
						});
					} else if (flow === FLOW_PREVIOUS) {
						const tempPage =
							sourceIndex + 1 < sources.length - 1
								? sources[sourceIndex + 1].firstPage
								: sources[sources.length - 1].firstPage;
						return getPage({
							components: questionnaire.components,
							bindings: bindings,
							currentPage: tempPage,
							featuresWithoutMD,
							flow: flow,
							management,
						});
					}
					return null;
				};

				if (!flow) exportedSetPage(initialPage || sources[0].firstPage);
				else {
					const newPage = getNewInitPage();
					if (!newPage) {
						if (flow === FLOW_NEXT) setSourceIndex(sourceIndex + 1);
						else setSourceIndex(sourceIndex - 1);
					} else setPage(newPage);
				}
			}
			setInitPage(true);
		}
	}, [
		initPage,
		isFirstSource,
		components,
		questionnaire.components,
		bindings,
		page,
		featuresWithoutMD,
		management,
		sourceIndex,
		sources,
		flow,
		wantedPage,
		exportedSetPage,
		initialPage,
	]);

	const handleChange = useCallback((updatedValue) => {
		setTodo((t) => ({ ...t, ...updatedValue }));
	}, []);

	const handleExternals = useCallback((externals) => {
		setTodoExternals((t) => ({ ...t, ...externals }));
	}, []);

	useEffect(() => {
		if (Object.keys(todo).length !== 0) {
			const newQ = updateQuestionnaire(savingType)(questionnaire)(
				preferences,
				logFunction
			)(todo);

			const bind = getBindings(newQ);
			setBindings(bind);
			setAllBindings({ ...allBindings, ...bind });
			setQuestionnaire(newQ);
			setTodo({});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		todo,
		preferences,
		logFunction,
		questionnaire,
		savingType,
		features,
		management,
	]);

	useEffect(() => {
		if (Object.keys(todoExternals).length !== 0) {
			const newQ = updateExternals(questionnaire)(logFunction)(todoExternals);
			setQuestionnaire(newQ);
			setTodoExternals({});
		}
	}, [todoExternals, logFunction, questionnaire]);

	const cancelModal = () => {
		setModalContent(null);
	};

	const validateModal = () => {
		const { confirm } = modalContent;
		if (confirm) confirm();
		setModalContent(null);
	};

	const componentsToDiplay =
		pagination && modalContent
			? [
					{
						componentType: 'Modal',
						controls: modalContent.controls,
						validateModal,
						cancelModal,
					},
					...components,
			  ]
			: components;

	if (isDev)
		console.log(`End useLunaticSplit: ${new Date().getTime() - start} ms`);

	return {
		questionnaire,
		handleChange,
		handleExternals,
		components: componentsToDiplay,
		bindings,
		allBindings,
		state: {
			getState: getStateSplit,
			getCollectedState: getCollectedStateSplit,
			getCollectedStateByValueType: getCollectedStateByValueTypeSplit,
			getBindings: getBindingsSplit,
		},
		pagination: {
			page: page,
			maxPage: sources[sources.length - 1].maxPage,
			goNext,
			goPrevious,
			isFirstPage: isFirstPage && isFirstSource,
			isLastPage: isLastPage && isLastSource,
			setPage: exportedSetPage,
		},
	};
};

export default useLunaticSplit;
