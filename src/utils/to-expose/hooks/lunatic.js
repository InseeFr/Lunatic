import { useState, useEffect, useCallback } from 'react';
import { mergeQuestionnaireAndData } from '../init-questionnaire';
import { getBindings } from '../state';
import { updateQuestionnaire } from '../handler';
import { getPage, FLOW_NEXT, FLOW_PREVIOUS } from '../../lib';
import { COLLECTED } from '../../../constants';
import { useFilterComponents } from './filter-components';
import { loadSuggesters } from '../../store-tools/auto-load';

const useLunatic = (
	source,
	data,
	{
		savingType = COLLECTED,
		preferences = [COLLECTED],
		features = ['VTL'],
		management = false,
		pagination = false,
		initialPage = '1',
		logFunction = null,
		autoSuggesterLoading = false,
		suggesterFetcher,
		suggesters,
	}
) => {
	const [initPage, setInitPage] = useState(false);
	const featuresWithoutMD = features.filter((f) => f !== 'MD');
	const [questionnaire, setQuestionnaire] = useState(() =>
		mergeQuestionnaireAndData(source)(data || {})
	);
	const bindings = getBindings(questionnaire);
	const [page, setPage] = useState(initialPage);

	const [todo, setTodo] = useState({});

	const components = useFilterComponents({
		questionnaire,
		management,
		bindings,
		features: featuresWithoutMD,
		page,
		pagination,
		todo,
	});

	const { suggesters: suggesterStrategy } = source;

	useEffect(() => {
		const init = async () => {
			if (
				autoSuggesterLoading &&
				typeof suggesters === 'object' &&
				Object.values(suggesters).length > 0
			) {
				// Merge suggester urls & suggester fields contained into lunatic json
				const s = Object.entries(suggesterStrategy).reduce((acc, [name, d]) => {
					if (suggesters[name]?.url)
						return {
							...acc,
							[name]: {
								...d,
								url: suggesters[name].url,
								stopWords: suggesters[name].stopWords,
							},
						};
					return acc;
				}, {});
				loadSuggesters(suggesterFetcher)(s);
			}
		};
		init();
	}, [autoSuggesterLoading, suggesterFetcher, suggesters, suggesterStrategy]);

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
				features: featuresWithoutMD,
				flow: FLOW_NEXT,
				management,
			});
			setPage(nextPage);
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
				features: featuresWithoutMD,
				flow: FLOW_PREVIOUS,
				management,
			});
			setPage(previousPage);
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

	return {
		questionnaire,
		handleChange,
		components,
		bindings,
		pagination: {
			page,
			setPage,
			maxPage,
			goNext,
			goPrevious,
			isFirstPage,
			isLastPage,
			flow,
		},
	};
};

export default useLunatic;
