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

const getVariablesFromComponents = (components, replaceLabel) =>
	Array.isArray(components)
		? components.reduce(
				(
					_,
					{
						componentType,
						response,
						responses,
						cells,
						options,
						components: inComponents,
					}
				) => {
					if (
						!componentType ||
						['Sequence', 'Subsequence', 'FilterDescription'].includes(
							componentType
						)
					)
						return _;
					else if (['CheckboxGroup'].includes(componentType)) {
						return { ..._, ...getVariableFromResponses(responses) };
					} else if (['TableVector', 'Loop'].includes(componentType)) {
						return { ..._, ...getVariableFromResponses(inComponents) };
					} else if (['Table'].includes(componentType)) {
						return { ..._, ...getVariableFromCells(cells) };
					} else if (componentType === 'Radio') {
						return {
							..._,
							...getVariableFromResponse(response, replaceLabel, options),
						};
					} else {
						return { ..._, ...getVariableFromResponse(response) };
					}
				},
				{}
		  )
		: {};

const getVariableFromResponse = (response, replaceLabel, options) => {
	const { name, valueState } = response;
	const values = valueState.reduce((__, { valueType, value }) => {
		const v =
			replaceLabel && value
				? options.find(o => o.value === value).label || ''
				: value;
		return { ...__, [valueType]: v };
	}, {});
	return { [name]: values };
};

export const getVariableFromResponses = responses => {
	return responses.reduce(
		(_, { response }) =>
			response ? { ..._, ...getVariableFromResponse(response) } : _,
		{}
	);
};

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

const getCollectedFromObject = obj =>
	Object.entries(obj).reduce(
		(_, o) => ({
			..._,
			[o[0]]: typeof o[1] === 'object' ? o[1].COLLECTED : o[1],
		}),
		{}
	);

const convertTrueAndFalse = bindings =>
	Object.entries(bindings).reduce((_, b) => {
		if (b[1] === true) return { ..._, [b[0]]: 'Vrai' };
		else if (b[1] === false) return { ..._, [b[0]]: 'Faux' };
		return { ..._, [b[0]]: b[1] };
	}, {});

export const getBindings = questionnaire => {
	const { variables } = questionnaire;
	return {
		...getCollectedStateByValueType(questionnaire)('COLLECTED', true),
		...getCalculatedFromVariables(variables),
		...getExternalFromVariables(variables),
	};
};

export const getLabelBindings = questionnaire => {
	const { components, variables } = questionnaire;
	const bindings = {
		...getCollectedFromObject(getVariablesFromComponents(components, true)),
		...getCalculatedFromVariables(variables),
		...getExternalFromVariables(variables),
	};
	return convertTrueAndFalse(bindings);
};
