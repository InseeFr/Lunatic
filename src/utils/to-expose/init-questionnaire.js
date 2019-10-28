export const mergeQuestionnaireAndData = questionnaire => data => {
	if (
		!questionnaire ||
		!questionnaire.components ||
		questionnaire.components.length === 0
	)
		return {};
	if (!data || Object.keys(data).length === 0) return questionnaire;
	const { COLLECTED: collectedData } = data;
	const { components, variables, ...props } = questionnaire;
	const filledComponents = components.reduce((_, component) => {
		const { response, componentType } = component;
		if (response)
			return [..._, mergeSimpleComponentAndData(component)(collectedData)];
		else if (componentType === 'CheckboxGroup')
			return [..._, mergeCheckboxGroupAndData(component)(collectedData)];
		else if (componentType === 'Table')
			return [..._, mergeTableAndData(component)(collectedData)];
		else return [..._, component];
	}, []);
	const filledVariables = {
		EXTERNAL: variables
			? variables
					.filter(({ variableType }) => variableType === 'EXTERNAL')
					.reduce((_, v) => ({ ..._, ...initExternalVariable(v)(data) }), {})
			: [],
		CALCULATED: variables
			? variables
					.filter(({ variableType }) => variableType === 'CALCULATED')
					.reduce((_, v) => ({ ..._, ...initCalculatedVariable(v)(data) }), {})
			: [],
	};
	return { ...props, components: filledComponents, variables: filledVariables };
};

const mergeSimpleComponentAndData = component => data => {
	if (!data || Object.keys(data).length === 0) return component;
	const { response, ...other } = component;
	const { name, valueState } = response;
	const newValueState = valueState.map(({ valueType, value }) => {
		const newValue =
			data[name] !== undefined && data[name][valueType] !== undefined
				? data[name][valueType]
				: value;
		return { valueType, value: newValue };
	});
	return { ...other, response: { name, valueState: newValueState } };
};

const mergeCheckboxGroupAndData = component => data => {
	if (!data || Object.keys(data).length === 0) return component;
	const { responses, ...other } = component;
	const newResponses = responses.map(c => mergeSimpleComponentAndData(c)(data));
	return { ...other, responses: newResponses };
};

const mergeTableAndData = component => data => {
	if (!data || Object.keys(data).length === 0) return component;
	const { cells, ...other } = component;
	const newCells = cells.reduce((_, line) => {
		const newLine = line.map(component =>
			component.response
				? mergeSimpleComponentAndData(component)(data)
				: component
		);
		return [..._, newLine];
	}, []);
	return { ...other, cells: newCells };
};

const initExternalVariable = ({ name }) => data => ({
	[name]: (data && data.EXTERNAL && data.EXTERNAL[name]) || null,
});

const initCalculatedVariable = ({ name, expression }) => data => ({
	[name]: { expression, value: null },
});
