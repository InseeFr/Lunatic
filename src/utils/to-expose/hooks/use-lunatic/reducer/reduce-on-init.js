import { createMapPages, checkLoops, isFirstLastPage } from '../commons';
import { mergeQuestionnaireAndData } from '../../../init-questionnaire';
import { getBindings } from '../../../state';

function buildResponse(questionnaire, bindings) {
	const { components } = questionnaire;

	return components.reduce(function (map, component) {
		const { response } = component;
		if (response) {
			const { name } = response;
			return { ...map, [name]: bindings[name] };
		}

		return map;
	}, {});
}

function buildDico(questionnaire) {
	const { variables } = questionnaire;
	const { EXTERNALS, COLLECTED, CALCULATED } = variables;

	return {};
}

function reduceOnInit(state, action) {
	const { payload } = action;
	const { source, data, initialPage, features } = payload;
	if (source && data) {
		const questionnaire = mergeQuestionnaireAndData(source)(data);
		const bindings = getBindings(questionnaire);
		const responses = buildResponse(questionnaire, bindings);
		console.log(responses);
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
			features,
		};
	}

	return state;
}

export default reduceOnInit;
