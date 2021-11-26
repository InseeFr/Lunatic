import { useState, useCallback, useEffect } from 'react';
import { mergeQuestionnaireAndData } from '../init-questionnaire';
import { getBindings } from '../state';

function useQuestionnaire(source, data) {
	const [questionnaire] = useState(() =>
		mergeQuestionnaireAndData(source)(data || {})
	);

	const [bindings, setBindings] = useState({});

	useEffect(
		function () {
			if (questionnaire) {
				setBindings(getBindings(questionnaire));
			}
		},
		[questionnaire]
	);

	function handleChange() {}

	return { questionnaire, handleChange, bindings };
}

export default useQuestionnaire;
