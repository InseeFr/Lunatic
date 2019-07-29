import React, { useState } from 'react';
import * as lunatic from '@inseefr/lunatic';

const mergeQuestionnaireAndData = questionnaire => data => {
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

const updateComponent = valueType => component => preferences => name => value => {
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
	else return component;
};

const updateQuestionnaire = valueType => questionnaire => preferences => updatedValue => {
	const [name, value] = Object.entries(updatedValue)[0];
	const components = questionnaire.components.reduce(
		(_, c) => [..._, updateComponent(valueType)(c)(preferences)(name)(value)],
		[]
	);
	return { ...questionnaire, components };
};

const buildUpdatedResponse = component => preferences => valueType => value => {
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

const buildUpdatedVectorResponse = responses => preferences => valueType => value => name =>
	responses.reduce((_, cellComponent) => {
		if (isComponentsConcernedByResponse(name)(cellComponent))
			_.push(
				buildUpdatedResponse(cellComponent)(preferences)(valueType)(value)
			);
		else _.push(cellComponent);
		return _;
	}, []);

const buildUpdatedCheckboxGroupResponse = component => preferences => valueType => value => name => {
	const { responses, ...other } = component;
	const newResponses = buildUpdatedVectorResponse(responses)(preferences)(
		valueType
	)(value)(name);
	return { ...other, responses: newResponses };
};

const buildUpdatedTableResponse = component => preferences => valueType => value => name => {
	const { cells, ...other } = component;
	const newCells = cells.reduce((_, line) => {
		_.push(
			buildUpdatedVectorResponse(line)(preferences)(valueType)(value)(name)
		);
		return _;
	}, []);
	return { ...other, cells: newCells };
};

const isComponentsConcernedByResponse = responseName => component =>
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

const Orchestrator = ({ savingType, preferences, source, data, tooltip }) => {
	const [questionnaire, setQuestionnaire] = useState(
		mergeQuestionnaireAndData(source)(data)
	);
	const onChange = updatedValue => {
		setQuestionnaire(
			updateQuestionnaire(savingType)(questionnaire)(preferences)(updatedValue)
		);
	};
	console.log(lunatic.getState(questionnaire));
	const components = questionnaire.components.map(q => {
		const { id, componentType } = q;
		const Component = lunatic[componentType];
		return (
			<div className="lunatic lunatic-component" key={`component-${id}`}>
				<Component
					{...q}
					handleChange={onChange}
					labelPosition="TOP"
					preferences={preferences}
					tooltip={tooltip}
				/>
			</div>
		);
	});
	return (
		<div className="container">
			<div className="components">{components}</div>
		</div>
	);
};

export default Orchestrator;
