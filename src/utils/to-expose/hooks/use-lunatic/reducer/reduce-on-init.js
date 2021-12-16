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
	const { COLLECTED, EXTERNAL, CALCULATED } = data;
	const { variableType } = variable;
	switch (variableType) {
		case 'COLLECTED':
			return getInitalValueFromCollected(variable, COLLECTED);
		case 'EXTERNAL':
			return getInitialValueFromExternal(variable, EXTERNAL);
		case 'CALCULATED':
			return getInitialValueFromExternal(variable, CALCULATED);
		default:
			return null;
	}
}

function appendToArrayMap(map, key, entry) {
	if (key in map) {
		return { ...map, [key]: [...map[key], entry] };
	}
	return { ...map, [key]: [entry] };
}

function appendToObjectMap(map, key, object) {
	if (key in map) {
		return { ...map, [key]: { ...map[key], ...object } };
	}
	return { ...map, [key]: object };
}

/**
 *
 * @param {*} source
 * @param {*} data
 * @returns
 */
function createVariables(source, data) {
	const { variables } = source;
	const [mapVariablesTypes, mapVariables] = variables.reduce(
		function ([mapType, mapVar], variable) {
			const { variableType: type, name } = variable;

			return [
				appendToArrayMap(mapType, type, variable),
				appendToObjectMap(mapVar, name, {
					variable,
					type,
					value: getInitialValue(variable, data),
				}),
			];
		},
		[{}, {}]
	);
	//
	const { CALCULATED = [] } = mapVariablesTypes;
	CALCULATED.forEach(function (calculated) {
		const { bindingDependencies = [] } = calculated;
		bindingDependencies.forEach(function (name) {
			if (name in mapVariables) {
				const variable = mapVariables[name];
				const { dependencies } = variable;
				if (dependencies) {
					dependencies.push(calculated);
				} else {
					variable.dependencies = [calculated];
				}
			}
		});
	});

	return mapVariables;
}
/* */

function reduceOnInit(state, action) {
	const { payload } = action;
	const { source, data, initialPage, features } = payload;
	if (source && data) {
		const variables = createVariables(source, data);
		const [executeExpression, updateBindings] = createExecuteExpression(
			variables,
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
