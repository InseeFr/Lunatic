import React, { useState } from 'react';
import * as lunatic from '@inseefr/lunatic';

const updateQuestionnaire = valueType => questionnaire => preferences => updatedValue => {
	const [name, value] = Object.entries(updatedValue)[0];
	const components = questionnaire.components.reduce((_, c) => {
		if (!isComponentsConcernedByResponse(name)(c)) {
			_.push(c);
			return _;
		} else if (c.response) {
			_.push(buildUpdatedResponse(c)(preferences)(valueType)(value));
		} else if (c.componentType === 'Checkbox')
			console.log('options', c.componentType);
		else if (c.componentType === 'Table')
			_.push(buildUpdatedTableResponse(c)(preferences)(valueType)(value)(name));
		else _.push(c);
		return _;
	}, []);
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

const buildUpdatedTableResponse = component => preferences => valueType => value => name => {
	const { cells, ...other } = component;
	const newCells = cells.reduce((_, line) => {
		_.push(
			line.reduce((__, cellComponent) => {
				if (isComponentsConcernedByResponse(name)(cellComponent))
					__.push(
						buildUpdatedResponse(cellComponent)(preferences)(valueType)(value)
					);
				else __.push(cellComponent);
				return __;
			}, [])
		);
		return _;
	}, []);
	return { ...other, cells: newCells };
};

const isComponentsConcernedByResponse = responseName => component =>
	(component.response && component.response.name === responseName) ||
	(component.options &&
		component.options.filter(
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

const Orchestrator = ({ savingType, preferences, source, tooltip }) => {
	const [questionnaire, setQuestionnaire] = useState(source);
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
