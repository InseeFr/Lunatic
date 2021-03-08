import { useState, useEffect, useCallback } from 'react';
import { interpret } from './interpret';
import { mergeQuestionnaireAndData } from './init-questionnaire';
import { getBindings } from './state';
import { updateQuestionnaire } from './handler';
import { COLLECTED } from '../../constants';

const cutomFilterPagination = ({ page }, pagination, currentPage) => {
	return pagination ? page === currentPage.split('.')[0] : true;
};

// "2.1#6" -> "1#6"
// "2.1#6.3#1" -> "1#6.3#1" -> "3#1"

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
			cutomFilterPagination(c, pagination, currentPage)
		);
	if (!pagination)
		return components.filter(
			({ conditionFilter }) =>
				!conditionFilter ||
				interpret(features)(bindings, true)(conditionFilter) === 'normal'
		);
	return components
		.filter((c) => cutomFilterPagination(c, pagination, currentPage))
		.filter(
			({ conditionFilter }) =>
				!conditionFilter ||
				interpret(features)(bindings, true)(conditionFilter) === 'normal'
		);
};

// Recusive function on currentPage
const getNextPage = (components, bindings, currentPage) => {
	const newPages = currentPage.split('.');
	const [first, ...rest] = newPages;

	let result = first;
	if (newPages.length > 1) {
		return `${result}.${getNextPage(components, bindings, rest.join('.'))}`;
	}
	if (first.includes('#')) {
		// TODO
	}
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
	// 4 : 2 inputs -> 5 ou 7
	const goNext = () => {
		const nextPage = getNextPage(components, page);
		if (!disabledNext) setPage(nextPage);
	};

	const goPrevious = () => {
		if (!disabledPrevious) setPage((p) => `${parseInt(p, 10) - 1}`);
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
