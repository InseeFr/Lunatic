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

function getInitialValueFromExternal(variable, data = {}) {
	const { name } = variable;
	if (name in data) {
		return data[name];
	}
	return undefined;
}

function getInitialValue(variable, data = {}) {
	const { COLLECTED, EXTERNAL } = data;
	const { variableType } = variable;
	switch (variableType) {
		case 'COLLECTED':
			return getInitalValueFromCollected(variable, COLLECTED);
		case 'EXTERNAL':
			return getInitialValueFromExternal(variable, EXTERNAL);
		case 'CALCULATED':
		default:
			return undefined;
	}
}

function createVariables(source, data) {
	const { variables } = source;
	//
	const mapVariablesTypes = variables.reduce(function (map, variable) {
		const { variableType } = variable;
		if (variableType in map) {
			return { ...map, [variableType]: [...map[variableType], variable] };
		}
		return { ...map, [variableType]: [variable] };
	}, {});

	//
	const mapVariables = Object.entries(mapVariablesTypes).reduce(function (
		map,
		[type, variables]
	) {
		return variables.reduce(
			function (sub, variable) {
				const { name } = variable;
				return {
					...sub,
					[name]: { variable, type, value: getInitialValue(variable, data) },
				};
			},
			{ ...map }
		);
	},
	{});
	//
	const { CALCULATED = [] } = mapVariablesTypes;
	const mapBindingDependencies = CALCULATED.reduce(function (map, variable) {
		const { bindingDependencies = [] } = variable;

		return bindingDependencies.reduce(
			function (sub, name) {
				if (name in sub) {
					return { ...sub, [name]: [...sub[name], variable] };
				}
				return { ...sub, [name]: [variable] };
			},
			{ ...map }
		);
	}, {});

	return [mapVariables, mapBindingDependencies];
}
/* */

function reduceOnInit(state, action) {
	const { payload } = action;
	const { source, data, initialPage, features } = payload;
	if (source && data) {
		const [variables, bindingDependencies] = createVariables(source, data);
		const [executeExpression, updateBindings] = createExecuteExpression(
			variables,
			bindingDependencies,
			features
		);
		const pages = checkLoops(createMapPages(source));
		const { maxPage } = source;
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
			variables,
			bindingDependencies,
			pages,
			isFirstPage,
			isLastPage,
			pager,
			executeExpression,
			updateBindings,
		};
	}

	return state;
}

export default reduceOnInit;
