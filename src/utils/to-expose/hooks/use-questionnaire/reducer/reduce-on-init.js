import { mergeQuestionnaireAndData } from '../../../init-questionnaire';

import { getBindings } from '../../../state';

function reduceOnInit(state, action) {
	const { payload } = action;
	const { source, data } = payload;
	if (source && data) {
		const questionnaire = mergeQuestionnaireAndData(source)(data);
		const bindings = getBindings(questionnaire);
		return { ...state, questionnaire, bindings };
	}
	return state;
}

export default reduceOnInit;
