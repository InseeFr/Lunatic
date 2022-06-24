import { useState, useEffect, useCallback } from 'react';
import { mergeQuestionnaireAndData } from '../init-questionnaire';
import { getBindings } from '../state';
import { updateQuestionnaire, updateExternals } from '../handler';
import {
	getPage,
	FLOW_NEXT,
	FLOW_PREVIOUS,
	getControls,
	isDev,
} from '../../lib';
import { COLLECTED } from '../../../constants';
import { useFilterComponents } from './filter-components';
import { loadSuggesters } from '../../store-tools/auto-load';

const defaultData = {};
const defaultPreferences = [COLLECTED];
const defaultFeatures = ['VTL'];

const useLunatic = (
	source,
	data = defaultData,
	{
		savingType = COLLECTED,
		preferences = defaultPreferences,
		features = defaultFeatures,
		management = false,
		pagination = false,
		modalForControls = false,
		initialPage = '1',
		logFunction = null,
		autoSuggesterLoading = false,
		suggesterFetcher,
		suggesters,
	}
) => {
	if (isDev) {
		console.log('useLunatic');
		var start = new Date().getTime();
	}
	const [initPage, setInitPage] = useState(false);
	const featuresWithoutMD = features.filter((f) => f !== 'MD');
	const [questionnaire, setQuestionnaire] = useState(() =>
		mergeQuestionnaireAndData(source)(data || {})
	);
	const [bindings, setBindings] = useState(() => getBindings(questionnaire));

	const [page, setPage] = useState(initialPage);

	const [todo, setTodo] = useState({});
	const [todoExternals, setTodoExternals] = useState({});

	const [modalContent, setModalContent] = useState(null);

	const [cache, setCache] = useState({});

	const components = useFilterComponents({
		questionnaire,
		management,
		bindings,
		features: featuresWithoutMD,
		page,
		pagination,
		todo: { ...todo, ...todoExternals },
		cache,
		setCache,
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

	const [flow, setFlow] = useState(FLOW_NEXT);

	// TODO: dynamic because of filters (kind of last accessible page)
	const { maxPage } = source;

	const isFirstPage = page === '1';
	const isLastPage = page === maxPage;

	// First param is the onClick event, useless for us but we have to keep it safe into
	// function signature to avoid confusing with customBindings
	const goNext = (_, customBindings) => {
		if (!isLastPage) {
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
			if (modalForControls) {
				const controls = getControls({
					page,
					features: featuresWithoutMD,
					components,
					bindings,
					preferences,
				});
				if (controls.length > 0) setModalContent({ page: nextPage, controls });
				else setPage(nextPage);
			} else setPage(nextPage);
		}
	};

	const goPrevious = () => {
		if (!isFirstPage) {
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
			if (modalForControls) {
				const controls = getControls({
					page,
					features: featuresWithoutMD,
					components,
					bindings,
					preferences,
				});
				if (controls.length > 0)
					setModalContent({ page: previousPage, controls });
				else setPage(previousPage);
			} else setPage(previousPage);
		}
	};

	useEffect(() => {
		if (!initPage && components && components.length === 0)
			// no component for initialPage, get next page
			setPage(
				getPage({
					components: questionnaire.components,
					bindings: bindings,
					currentPage: page,
					features: featuresWithoutMD,
					flow: FLOW_NEXT,
					management,
				})
			);
		else if (!initPage && components && components.length > 0)
			// initialPage is correct, end of initPage
			setInitPage(true);
	}, [
		initPage,
		components,
		questionnaire.components,
		bindings,
		page,
		featuresWithoutMD,
		management,
	]);

	const handleChange = useCallback((updatedValue) => {
		setTodo((t) => ({ ...t, ...updatedValue }));
	}, []);

	const handleExternals = useCallback((externals) => {
		setTodoExternals((t) => ({ ...t, ...externals }));
	}, []);

	// Assume we only want to handle source update
	useEffect(() => {
		setQuestionnaire(mergeQuestionnaireAndData(source)(data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [source]);

	useEffect(() => {
		if (Object.keys(todo).length !== 0) {
			const newQ = updateQuestionnaire(savingType)(questionnaire)(
				preferences,
				logFunction
			)(todo);
			setBindings(getBindings(newQ));
			setQuestionnaire(newQ);
			setTodo({});
		}
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
			const newQ = updateExternals(questionnaire)(logFunction, preferences)(
				todoExternals
			);
			setBindings(getBindings(newQ));
			setQuestionnaire(newQ);
			setTodoExternals({});
		}
	}, [todoExternals, logFunction, questionnaire, preferences]);

	const cancelModal = () => {
		setModalContent(null);
	};

	const validateModal = () => {
		setPage(modalContent.page);
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

	if (isDev) console.log(`End useLunatic: ${new Date().getTime() - start} ms`);

	return {
		questionnaire,
		handleChange,
		handleExternals,
		components: componentsToDiplay,
		bindings,
		pagination: {
			page,
			maxPage,
			goNext,
			goPrevious,
			isFirstPage,
			isLastPage,
			setPage,
		},
	};
};

export default useLunatic;
