import { createMapPages, checkLoops, isFirstLastPage } from '../commons';
import { mergeQuestionnaireAndData } from '../../../init-questionnaire';
import { getBindings } from '../../../state';

function reduceOnInit(state, action) {
	const { payload } = action;
	const { source, data, initialPage } = payload;
	if (source && data) {
		const questionnaire = mergeQuestionnaireAndData(source)(data);
		const bindings = getBindings(questionnaire);
		const { maxPage, components } = questionnaire;
		let pages = {};
		if (Array.isArray(components) && components.length && maxPage) {
			pages = checkLoops(createMapPages(components));
		}

		const pager = {
			page: initialPage,
			maxPage: Number.parseInt(maxPage) || 1,
			subPage: undefined,
			nbSubPages: undefined,
			iteration: undefined,
			nbIterations: undefined,
		};
		const { isFirstPage, isLastPage } = isFirstLastPage(pager);
		return {
			...state,
			questionnaire,
			bindings,
			pages,
			isFirstPage,
			isLastPage,
			pager,
		};
	}

	return state;
}

export default reduceOnInit;
