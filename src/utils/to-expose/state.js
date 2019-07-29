export const getState = questionnaire => {
	const { components, variables } = questionnaire;
	const COLLECTED = getVariablesFromComponents(components);
	const CALCULATED = Array.isArray(variables)
		? variables
				.filter(({ variableType }) => variableType === 'CALCULATED')
				.reduce(
					(_, { name }) => ({ ..._, [name]: 'Evaluation is coming soon!' }),
					{}
				)
		: {};
	const EXTERNAL =
		Array.isArray(variables) &&
		variables.filter(({ variableType }) => variableType === 'EXTERNAL').length >
			0
			? variables
					.filter(({ variableType }) => variableType === 'EXTERNAL')
					.reduce((_, { name, label }) => ({ ..._, [name]: label }), {})
			: {};
	return { COLLECTED, CALCULATED, EXTERNAL };
};

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
