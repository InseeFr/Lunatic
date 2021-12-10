import { createMapPages, checkLoops, isFirstLastPage } from '../commons';

/* à bouger d'ici */

function getInitalValueFromCollected(variable) {
	const { values, value } = variable;
	if (value) {
		return value;
	}
	if (values) {
		const { COLLECTED, FORCED } = values;
		return FORCED || COLLECTED;
	}
	return undefined;
}

function getInitialValue(variable) {
	const { variableType } = variable;
	switch (variableType) {
		case 'COLLECTED':
			return getInitalValueFromCollected(variable);
		case 'EXTERNAL':
		case 'CALCULATED':
		default:
			return undefined;
	}
}

function createVariables(source) {
	const { variables } = source;
	return variables.reduce(function (map, original) {
		const { name } = original;
		return { ...map, [name]: { original, value: getInitialValue(original) } };
	}, {});
}
/* */

function reduceOnInit(state, action) {
	const { payload } = action;
	const { source, data, initialPage, features } = payload;
	if (source && data) {
		const questionnaire = source; //mergeQuestionnaireAndData(source)(data);
		const variables = createVariables(source);
		const bindings = {}; // TODO
		const pages = checkLoops(createMapPages(questionnaire));
		const { maxPage } = questionnaire;

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
			variables,
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
