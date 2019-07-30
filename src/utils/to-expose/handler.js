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
	if (preferences.includes(valueType)) {
		const toCheck = preferences.slice(0, preferences.indexOf(valueType));
		const lastValue = toCheck.reduce(
			(_, type) =>
				component.response.valueState.find(v => v.valueType === type).value ||
				_,
			''
		);
		if (value === lastValue) newValue = null;
	}
	return {
		...component,
		response: {
			...component.response,
			valueState: component.response.valueState.reduce((__, v) => {
				if (v.valueType === valueType)
					return [...__, { ...v, value: newValue }];
				return [...__, v];
			}, []),
		},
	};
};

export const buildUpdatedVectorResponse = responses => preferences => valueType => value => name =>
	responses.reduce((_, cellComponent) => {
		if (isComponentsConcernedByResponse(name)(cellComponent))
			_.push(
				buildUpdatedResponse(cellComponent)(preferences)(valueType)(value)
			);
		else _.push(cellComponent);
		return _;
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
