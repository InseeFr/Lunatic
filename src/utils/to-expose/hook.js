import { useState, useEffect, useCallback } from 'react';
import { interpret } from './interpret';
import { mergeQuestionnaireAndData } from './init-questionnaire';
import { getBindings } from './state';
import { updateQuestionnaire } from './handler';

const filterComponents = (components, tooltip, bindings) =>
	components.filter(({ conditionFilter }) =>
		tooltip ? true : interpret(['VTL'])(bindings)(conditionFilter) === 'normal'
	);

const useLunatic = (source, data, savingType, preferences, hasToFilter) => {
	const [questionnaire, setQuestionnaire] = useState(
		mergeQuestionnaireAndData(source)(data)
	);
	const [components, setComponents] = useState(() =>
		filterComponents(
			questionnaire.components,
			hasToFilter,
			getBindings(questionnaire)
		)
	);
	const [todo, setTodo] = useState({});

	const handleChange = useCallback((updatedValue) => {
		setTodo(updatedValue);
	}, []);

	useEffect(() => {
		console.log('effect');
		if (Object.keys(todo).length !== 0) {
			const newQ = updateQuestionnaire(savingType)(questionnaire)(preferences)(
				todo
			);
			setQuestionnaire(newQ);
			setComponents(
				filterComponents(newQ.components, hasToFilter, getBindings(newQ))
			);
			setTodo({});
		}
	}, [todo, preferences, questionnaire, savingType, hasToFilter]);

	const bindings = getBindings(questionnaire);

	return { questionnaire, handleChange, components, bindings };
};

export default useLunatic;
