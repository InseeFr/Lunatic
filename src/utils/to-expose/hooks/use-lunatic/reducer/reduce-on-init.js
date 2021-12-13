import {
	createMapPages,
	checkLoops,
	isFirstLastPage,
	createExecuteExpression,
} from '../commons';

/* à bouger d'ici */

function getInitalValueFromCollected(variable, data = {}) {
	const { values, name } = variable;
	let fromData;
	if (name in data) {
		const { COLLECTED, FORCED } = data[name];
		fromData = COLLECTED || FORCED;
	}

	if (values) {
		const { COLLECTED, FORCED } = values;
		return fromData || FORCED || COLLECTED;
	}
	return undefined;
}

function getInitialValueFromExternal(variable, data) {
	const { name } = variable;

	if (name in data) {
		const { EXTERNAL } = data[name];
		return EXTERNAL;
	}
	return undefined;
}

function getInitialValue(variable, data = {}) {
	const { COLLECTED } = data;
	const { variableType } = variable;
	switch (variableType) {
		case 'COLLECTED':
			return getInitalValueFromCollected(variable, COLLECTED);
		case 'EXTERNAL':
			return getInitialValueFromExternal(variable, data);
		case 'CALCULATED':
		default:
			return undefined;
	}
}

function createVariablesAndBindings(source, data) {
	const { variables } = source;

	return variables.reduce(function (map, variable) {
		const { name } = variable;
		const value = getInitialValue(variable, data);

		return { ...map, [name]: { variable, value } };
	}, {});
}
/* */

function reduceOnInit(state, action) {
	const { payload } = action;
	const { source, data, initialPage, features } = payload;
	if (source && data) {
		const questionnaire = source;
		const variables = createVariablesAndBindings(source, data);

		const [executeExpression, updateBindings] =
			createExecuteExpression(variables);
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
			pages,
			isFirstPage,
			isLastPage,
			pager,
			features,
			executeExpression,
			updateBindings,
		};
	}

	return state;
}

export default reduceOnInit;
