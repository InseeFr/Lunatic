import { useState, useEffect, useCallback } from 'react';
import { interpret } from './interpret';
import { mergeQuestionnaireAndData } from './init-questionnaire';
import { getBindings } from './state';
import { updateQuestionnaire } from './handler';

const filterComponents = (components, tooltip, bindings, features) =>
	components.filter(({ conditionFilter }) =>
		tooltip ? true : interpret(features)(bindings)(conditionFilter) === 'normal'
	);

const useLunatic = (
	source,
	data,
	savingType,
	preferences,
	features,
	hasToFilter
) => {
	const [questionnaire, setQuestionnaire] = useState(
		mergeQuestionnaireAndData(source)(data)
	);
	const [components, setComponents] = useState(() =>
		filterComponents(
			questionnaire.components,
			hasToFilter,
			getBindings(questionnaire),
			features
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
					features
				)
			);
			setTodo({});
		}
	}, [todo, preferences, questionnaire, savingType, features, hasToFilter]);

	const bindings = getBindings(questionnaire);

	return { questionnaire, handleChange, components, bindings };
};

export default useLunatic;
