export const getState = questionnaire => {
	const { components, variables } = questionnaire;
	const COLLECTED = getVariablesFromComponents(components);
	const CALCULATED = getCalculatedFromVariables(variables);
	const EXTERNAL = getExternalFromVariables(variables);
	return { COLLECTED, CALCULATED, EXTERNAL };
};

export const getCollectedState = questionnaire =>
	getState(questionnaire).COLLECTED;

export const getCollectedStateByValueType = questionnaire => (
	valueType,
	displayNull
) =>
	['PREVIOUS', 'COLLECTED', 'FORCED', 'EDITED', 'INPUTED'].includes(valueType)
		? Object.entries(getCollectedState(questionnaire)).reduce((_, v) => {
				if (displayNull || v[1][valueType] !== null)
					return {
						..._,
						[v[0]]: v[1][valueType],
					};
				return _;
		  }, {})
		: {};

const getVariablesFromComponents = components =>
	Array.isArray(components)
		? components.reduce((_, { componentType, response, responses, cells }) => {
				if (
					!componentType ||
					['Sequence', 'Subsequence'].includes(componentType)
				)
					return _;
				else if (componentType === 'CheckboxGroup') {
					return { ..._, ...getVariableFromResponses(responses) };
				} else if (componentType === 'Table') {
					return { ..._, ...getVariableFromCells(cells) };
				} else {
					return { ..._, ...getVariableFromResponse(response) };
				}
		  }, {})
		: {};

const getVariableFromResponse = response => {
	const { name, valueState } = response;
	const values = valueState.reduce(
		(__, { valueType, value }) => ({ ...__, [valueType]: value }),
		{}
	);
	return { [name]: values };
};

const getVariableFromResponses = responses =>
	responses.reduce(
		(_, { response }) => ({ ..._, ...getVariableFromResponse(response) }),
		{}
	);

const getVariableFromCells = cells =>
	cells.reduce(
		(_, components) => ({ ..._, ...getVariablesFromComponents(components) }),
		{}
	);

const getCalculatedFromVariables = variables =>
	variables && variables.CALCULATED
		? Object.entries(variables.CALCULATED).reduce(
				(_, [name, { value }]) => ({ ..._, [name]: value }),
				{}
		  )
		: {};

const getExternalFromVariables = variables =>
	variables && variables.EXTERNAL
		? Object.entries(variables.EXTERNAL).reduce(
				(_, [name, value]) => ({ ..._, [name]: value }),
				{}
		  )
		: {};

export const getBindings = questionnaire => {
	const { variables } = questionnaire;
	return {
		...getCollectedStateByValueType(questionnaire)('COLLECTED', true),
		...getCalculatedFromVariables(variables),
		...getExternalFromVariables(variables),
	};
};
