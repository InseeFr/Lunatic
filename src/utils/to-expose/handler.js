export const updateQuestionnaire = valueType => questionnaire => preferences => updatedValue => {
	if (
		!['PREVIOUS', 'COLLECTED', 'FORCED', 'EDITED', 'INPUTED'].includes(
			valueType
		) ||
		preferences.length === 0 ||
		Object.entries(updatedValue).length !== 1
	)
		return questionnaire;

	const [name, value] = Object.entries(updatedValue)[0];
	const components = questionnaire.components.reduce(
		(_, c) => [..._, updateComponent(valueType)(c)(preferences)(name)(value)],
		[]
	);
	return { ...questionnaire, components };
};

export const updateComponent = valueType => component => preferences => name => value => {
	const { response, componentType } = component;
	if (!isComponentsConcernedByResponse(name)(component)) {
		return component;
	} else if (response) {
		return buildUpdatedResponse(component)(preferences)(valueType)(value);
	} else if (componentType === 'CheckboxGroup')
		return buildUpdatedCheckboxGroupResponse(component)(preferences)(valueType)(
			value
		)(name);
	else if (componentType === 'Table')
		return buildUpdatedTableResponse(component)(preferences)(valueType)(value)(
			name
		);
};

export const isComponentsConcernedByResponse = responseName => component =>
	(component.response && component.response.name === responseName) ||
	(component.responses &&
		component.responses.filter(
			o => o.response && o.response.name === responseName
		).length !== 0) ||
	(component.cells &&
		component.cells
			.reduce((_, line) => {
				line.forEach(l => {
					if (l.response && l.response.name) _.push(l.response.name);
				});
				return _;
			}, [])
			.filter(str => str === responseName).length === 1);

export const buildUpdatedResponse = component => preferences => valueType => value => {
	let newValue = value;
	const { response, componentType } = component;
	const { valueState } = response;
	if (preferences.length > 1 && preferences.includes(valueType)) {
		const lastValue = preferences
			.slice(0, preferences.length - 1)
			.reduce(
				(_, type) =>
					valueState.find(v => v.valueType === type).value !== null
						? valueState.find(v => v.valueType === type).value
						: _,
				''
			);
		if (value === lastValue) newValue = null;
	}
	if (
		componentType === 'CheckboxOne' &&
		valueState.find(v => v.valueType === valueType).value === newValue
	)
		newValue = null;
	if (
		componentType === 'CheckboxBoolean' &&
		value === false &&
		response.valueState.filter(
			vs => !(vs.value === null || vs.valueType === valueType)
		).length === 0
	)
		newValue = null;
	return {
		...component,
		response: {
			...component.response,
			valueState: valueState.reduce((__, v) => {
				if (v.valueType === valueType)
					return [...__, { ...v, value: newValue }];
				return [...__, v];
			}, []),
		},
	};
};

export const buildUpdatedVectorResponse = responses => preferences => valueType => value => name =>
	responses.reduce((_, cellComponent) => {
		if (isComponentsConcernedByResponse(name)(cellComponent)) {
			const component = { ...cellComponent, componentType: 'CheckboxBoolean' };
			return [
				..._,
				buildUpdatedResponse(component)(preferences)(valueType)(value),
			];
		}
		return [..._, cellComponent];
	}, []);

export const buildUpdatedCheckboxGroupResponse = component => preferences => valueType => value => name => {
	const { responses, ...other } = component;
	const newResponses = buildUpdatedVectorResponse(responses)(preferences)(
		valueType
	)(value)(name);
	return { ...other, responses: newResponses };
};

export const buildUpdatedTableResponse = component => preferences => valueType => value => name => {
	const { cells, ...other } = component;
	const newCells = cells.reduce((_, line) => {
		_.push(
			buildUpdatedVectorResponse(line)(preferences)(valueType)(value)(name)
		);
		return _;
	}, []);
	return { ...other, cells: newCells };
};
