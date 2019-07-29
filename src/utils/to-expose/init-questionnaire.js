export const mergeQuestionnaireAndData = questionnaire => data => {
	const { components, ...props } = questionnaire;
	const filledComponents = components.reduce((_, component) => {
		const { response, componentType } = component;
		if (response) return [..._, mergeSimpleComponentAndData(component)(data)];
		else if (componentType === 'CheckboxGroup')
			return [..._, mergeCheckboxGroupAndData(component)(data)];
		else if (componentType === 'Table')
			return [..._, mergeTableAndData(component)(data)];
		else return [..._, component];
	}, []);
	return { ...props, components: filledComponents };
};

const mergeSimpleComponentAndData = component => data => {
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
	const { responses, ...other } = component;
	const newResponses = responses.map(c => mergeSimpleComponentAndData(c)(data));
	return { ...other, responses: newResponses };
};

const mergeTableAndData = component => data => {
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
