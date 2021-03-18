import { useState, useEffect, useCallback } from 'react';
import { interpret } from './interpret';
import { mergeQuestionnaireAndData } from './init-questionnaire';
import { getBindings } from './state';
import { updateQuestionnaire } from './handler';
import { getNextPage } from '../lib/pagination';
import { COLLECTED } from '../../constants';

const customFilterPagination = ({ page }, pagination, currentPage) => {
	return pagination ? page === currentPage : true;
};

const filterComponents = (
	components,
	management,
	bindings,
	features,
	currentPage,
	pagination
) => {
	if (management && !pagination) return components;
	if (management && pagination)
		return components.filter((c) =>
			customFilterPagination(c, pagination, currentPage)
		);
	if (!pagination)
		return components.filter(
			({ conditionFilter }) =>
				!conditionFilter ||
				interpret(features)(bindings, true)(conditionFilter) === 'normal'
		);
	return components
		.filter((c) => customFilterPagination(c, pagination, currentPage))
		.filter(
			({ conditionFilter }) =>
				!conditionFilter ||
				interpret(features)(bindings, true)(conditionFilter) === 'normal'
		);
};

const useLunatic = (
	source,
	data,
	{
		savingType = COLLECTED,
		preferences = [COLLECTED],
		features = ['VTL'],
		management = false,
		pagination = false,
	}
) => {
	const [questionnaire, setQuestionnaire] = useState(
		mergeQuestionnaireAndData(source)(data || {})
	);
	const [todo, setTodo] = useState({});
	const [page, setPage] = useState('1');

	const { maxPage } = source;

	const disabledNext = page === maxPage;
	const disabledPrevious = page === '1';

	const goNext = () => {
		if (!disabledNext) {
			const nextPage = getNextPage(
				questionnaire.components,
				bindings,
				page,
				features
			);
			setPage(nextPage);
		}
	};

	const goPrevious = () => {
		if (!disabledPrevious) {
			// TODO
			// const nextPage = getPreviousPage(
			// 	questionnaire.components,
			// 	bindings,
			// 	page,
			// 	features
			// );
			setPage((p) => `${parseInt(p, 10) - 1}`);
		}
	};

	const handleChange = useCallback((updatedValue) => {
		setTodo(updatedValue);
	}, []);

	// Assume we only want to handle source update
	useEffect(() => {
		setQuestionnaire(mergeQuestionnaireAndData(source)(data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [source]);

	useEffect(() => {
		if (Object.keys(todo).length !== 0) {
			const newQ = updateQuestionnaire(savingType)(questionnaire)(preferences)(
				todo
			);
			setQuestionnaire(newQ);
			setTodo({});
		}
	}, [todo, preferences, questionnaire, savingType, features, management]);

	const bindings = getBindings(questionnaire);

	const components = filterComponents(
		questionnaire.components,
		management,
		bindings,
		features,
		page,
		pagination
	);

	return {
		questionnaire,
		handleChange,
		components,
		bindings,
		pagination: {
			page,
			maxPage,
			goNext,
			goPrevious,
			setPage,
			disabledNext,
			disabledPrevious,
		},
	};
};

export default useLunatic;
