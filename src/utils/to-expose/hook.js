import { useState, useEffect, useCallback } from 'react';
import { interpret } from './interpret';
import { mergeQuestionnaireAndData } from './init-questionnaire';
import { getBindings } from './state';
import { updateQuestionnaire } from './handler';
import { COLLECTED } from '../../constants';

const filterComponents = (components, management, bindings, features) =>
	components.filter(({ conditionFilter }) =>
		management || !conditionFilter
			? true
			: interpret(features)(bindings, true)(conditionFilter) === 'normal'
	);

const useLunatic = (
	source,
	data = {},
	{
		savingType = COLLECTED,
		preferences = [COLLECTED],
		features = ['VTL'],
		management = false,
	}
) => {
	const [questionnaire, setQuestionnaire] = useState(() =>
		mergeQuestionnaireAndData(source)(data)
	);
	const [components, setComponents] = useState(() =>
		filterComponents(
			questionnaire.components,
			management,
			getBindings(questionnaire),
			features
		)
	);

	const handleChange = useCallback(
		(up) => {
			const newQ = updateQuestionnaire(savingType)(questionnaire)(preferences)(
				up
			);
			setQuestionnaire(newQ);
			setComponents(
				filterComponents(
					newQ.components,
					management,
					getBindings(newQ),
					features
				)
			);
		},
		[savingType, questionnaire, preferences, management, features]
	);

	const bindings = getBindings(questionnaire);

	return { questionnaire, handleChange, components, bindings };
};

export default useLunatic;
