import reduceVariablesArray from './reduce-variables-array';
import reduceVariablesSimple from './reduce-variables-simple';
import { getCompatibleVTLExpression } from '../../commons';

function isOnSubPage(pager) {
	const { subPage } = pager;
	return subPage !== undefined;
}

function updateVariables(state, action) {
	const { payload } = action;
	const { response, value, args = {} } = payload;
	const { name } = response;
	const { loop, index, length } = args;

	const { pager, variables } = state;
	const { nbIterations, iteration } = pager;

	if (loop) {
		const variablesNext = reduceVariablesArray(variables, {
			name,
			value,
			index,
			length,
		});
		return { ...state, variables: variablesNext };
	} else if (isOnSubPage(pager)) {
		const variablesNext = reduceVariablesArray(variables, {
			name,
			value,
			index: iteration,
			length: nbIterations,
		});

		return { ...state, variables: variablesNext };
	} else {
		const variablesNext = reduceVariablesSimple(variables, { name, value });
		return { ...state, variables: variablesNext };
	}
}

/**
 * met à jour bindings pour l'exe du VTL (en appelant la fonction fournit par createExecuteExpression)
 * @param {*} state
 * @param {*} action
 * @returns
 */
function updateBindings(state, action) {
	const { payload } = action;
	const { response } = payload;
	const { name } = response;
	const { updateBindings, variables } = state;
	const { value } = variables[name];

	updateBindings(name, value);

	return state;
}

function missing(state, action) {
	const {
		payload: {
			response: { name },
		},
	} = action;
	const { missingBlock } = state;
	if (name in missingBlock) {
		const { variables, updateBindings } = state;
		const toClean = missingBlock[name];
		const delta = toClean.reduce((acc, variableName) => {
			const { value, ...rest } = variables[variableName];
			updateBindings(variableName, null);
			return { ...acc, [variableName]: { ...rest, value: null } };
		}, {});
		return { ...state, variables: { ...variables, ...delta } };
	}
	return state;
}

function cleaning(state, action) {
	const { payload } = action;
	const { response } = payload;
	const { executeExpression, cleaning, updateBindings, variables, pager } =
		state;
	const { iteration } = pager;
	if (response) {
		const { name } = response;
		if (name in cleaning) {
			const expressions = cleaning[name];
			const delta = Object.entries(expressions).reduce(function (
				step,
				[key, expression]
			) {
				const isCleaning = executeExpression(
					getCompatibleVTLExpression(expression),
					{ iteration }
				);
				if (!isCleaning && key in variables) {
					const variable = variables[key];
					updateBindings(key, null);
					return { ...step, [key]: { ...variable, value: null } };
				}
				return step;
			},
			{});

			return {
				...state,
				variables: {
					...variables,
					...delta,
				},
			};
		}
	}
	return state;
}

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
function reduceHandleChange(state, action) {
	return missing(
		cleaning(updateBindings(updateVariables(state, action), action), action),
		action
	);
}

export default reduceHandleChange;
