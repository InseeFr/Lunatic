export const getState = questionnaire => {
	const { components, variables } = questionnaire;
	const COLLECTED = getVariablesFromComponents(components);
	//	TODO
	// const CALCULATED = Array.isArray(variables)
	// 	? variables.filter(({ variableType }) => variableType === 'CALCULATED')
	// 	: {};
	// const EXTERNAL = Array.isArray(variables)
	// 	? variables.filter(({ variableType }) => variableType === 'EXTERNAL')
	// 	: {};
	return { COLLECTED, CALCULATED: {}, EXTERNAL: {} };
};

const getVariablesFromComponents = components =>
	Array.isArray(components)
		? components.reduce((_, { componentType, response, options, cells }) => {
				if (
					!componentType ||
					['Sequence', 'Subsequence'].includes(componentType)
				)
					return _;
				else if (componentType === 'Checkbox') {
					return { ..._, ...getVariableFromOptions(options) };
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

const getVariableFromOptions = options =>
	options.reduce(
		(_, { response }) => ({ ..._, ...getVariableFromResponse(response) }),
		{}
	);

const getVariableFromCells = cells =>
	cells.reduce(
		(_, components) => ({ ..._, ...getVariablesFromComponents(components) }),
		{}
	);
