import { useState, useEffect, useCallback } from 'react';
import { interpret } from './interpret';
import { mergeQuestionnaireAndData } from './init-questionnaire';
import { getBindings } from './state';
import { updateQuestionnaire } from './handler';

const filterComponents = (components, tooltip, bindings, preferences) =>
	components.filter(({ conditionFilter }) =>
		tooltip
			? true
			: interpret(preferences)(bindings)(conditionFilter) === 'normal'
	);

const useLunatic = (source, data, savingType, preferences, hasToFilter) => {
	const [questionnaire, setQuestionnaire] = useState(
		mergeQuestionnaireAndData(source)(data)
	);
	const [components, setComponents] = useState(() =>
		filterComponents(
			questionnaire.components,
			hasToFilter,
			getBindings(questionnaire),
			preferences
		)
	);
	const [todo, setTodo] = useState({});

	const handleChange = useCallback((updatedValue) => {
		setTodo(updatedValue);
	}, []);

	useEffect(() => {
		if (Object.keys(todo).length !== 0) {
			const newQ = updateQuestionnaire(savingType)(questionnaire)(preferences)(
				todo
			);
			setQuestionnaire(newQ);
			setComponents(
				filterComponents(
					newQ.components,
					hasToFilter,
					getBindings(newQ),
					preferences
				)
			);
			setTodo({});
		}
	}, [todo, preferences, questionnaire, savingType, hasToFilter]);

	const bindings = getBindings(questionnaire);

	return { questionnaire, handleChange, components, bindings };
};

export default useLunatic;
