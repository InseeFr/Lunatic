export const updateQuestionnaire = valueType => questionnaire => preferences => updatedValue => {
	if (
		!['PREVIOUS', 'COLLECTED', 'FORCED', 'EDITED', 'INPUTED'].includes(
			valueType
		) ||
		preferences.length === 0
	)
		return questionnaire;
	const components = questionnaire.components.reduce(
		(_, c) => [..._, updateComponent(valueType)(c)(preferences)(updatedValue)],
		[]
	);
	return { ...questionnaire, components };
};

export const updateComponent = valueType => component => preferences => updatedValue => {
	const { response, componentType } = component;
	return Object.entries(updatedValue).reduce((acc, [name, value]) => {
		if (!isComponentsConcernedByResponse(name)(component)) {
			return acc;
		} else if (response) {
			return buildUpdatedResponse(component)(preferences)(valueType)(value);
		} else if (componentType === 'CheckboxGroup')
			return buildUpdatedCheckboxGroupResponse(component)(preferences)(
				valueType
			)(value)(name);
		else if (['TableVector', 'Loop'].includes(componentType))
			return buildUpdatedTableVectorResponse(component)(preferences)(valueType)(
				value
			)(name);
		else if (componentType === 'Table')
			return buildUpdatedTableResponse(component)(preferences)(valueType)(
				value
			)(name);
		return acc;
	}, component);
};

export const isComponentsConcernedByResponse = responseName => component =>
	(component.response && component.response.name === responseName) ||
	(component.responses &&
		component.responses.filter(
			o => o.response && o.response.name === responseName
		).length !== 0) ||
	(component.components &&
		component.components
			.reduce(
				(acc, c) =>
					c.response && c.response.name ? [...acc, c.response.name] : acc,
				[]
			)
			.filter(str => str === responseName).length === 1) ||
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
		if (
			Array.isArray(value) &&
			value.length === lastValue.length &&
			value.every((value, index) => value === lastValue[index])
		)
			newValue = value.map(() => null);
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

export const buildUpdatedVectorResponse = responses => preferences => valueType => value => name => {
	return responses.reduce((_, cellComponent) => {
		if (isComponentsConcernedByResponse(name)(cellComponent))
			return [
				..._,
				buildUpdatedResponse(cellComponent)(preferences)(valueType)(value),
			];
		return [..._, cellComponent];
	}, []);
};

export const buildUpdatedCheckboxGroupResponse = component => preferences => valueType => value => name => {
	const { responses, ...other } = component;
	const res = responses.map(r => ({ ...r, componentType: 'CheckboxBoolean' }));
	const newResponses = buildUpdatedVectorResponse(res)(preferences)(valueType)(
		value
	)(name);
	return { ...other, responses: newResponses };
};

export const buildUpdatedTableVectorResponse = component => preferences => valueType => value => name => {
	const { components, ...other } = component;
	const newComponents = components.reduce(
		(_, c) =>
			isComponentsConcernedByResponse(name)(c)
				? [..._, buildUpdatedResponse(c)(preferences)(valueType)(value)]
				: [..._, c],
		[]
	);
	return { ...other, components: newComponents };
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
