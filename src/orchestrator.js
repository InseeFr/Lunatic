import React, { useState } from 'react';
import * as lunatic from '@inseefr/lunatic';
import simspons from './simpsons';
import logo from './img/lunatic-logo.png';
import './custom-lunatic.scss';

const updateQuestionnaire = valueType => questionnaire => update => {
	const [name, value] = Object.entries(update)[0];
	const components = questionnaire.components.reduce((_, c) => {
		if (!isComponentsConcernedByResponse(name)(c)) {
			_.push(c);
			return _;
		} else if (c.response) {
			_.push({
				...c,
				response: {
					...c.response,
					valueState: c.response.valueState.reduce((__, v) => {
						if (v.valueType === valueType) return [...__, { ...v, value }];
						return [...__, v];
					}, []),
				},
			});
		} else if (c.options) console.log('options', c.componentType);
		else if (c.cells) console.log('cells', c.componentType);
		else _.push(c);
		return _;
	}, []);
	return { ...questionnaire, components };
};

const isComponentsConcernedByResponse = responseName => component =>
	(component.response && component.response.name === responseName) ||
	(component.options &&
		component.options.filter(
			o => o.response && o.response.name === responseName
		).length !== 0);

const Orchestrator = () => {
	const [questionnaire, setQuestionnaire] = useState(simspons);
	const onChange = update => {
		setQuestionnaire(updateQuestionnaire('FORCED')(questionnaire)(update));
	};
	console.log(questionnaire.components);
	const components = questionnaire.components.map(q => {
		const { id, componentType } = q;
		const Component = lunatic[componentType];
		return (
			<div className="lunatic lunatic-component" key={`component-${id}`}>
				<Component
					{...q}
					handleChange={onChange}
					labelPosition="TOP"
					preferences={['COLLECTED', 'FORCED']}
				/>
			</div>
		);
	});
	return (
		<>
			<div className="lunatic-img-container">
				<img className="lunatic-img" alt="lunatic" src={logo} />
			</div>
			<div className="container">
				<div className="components">{components}</div>
			</div>
		</>
	);
};

export default Orchestrator;
