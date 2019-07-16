import React, { useState } from 'react';
import * as lunatic from '@inseefr/lunatic';
import simspons from './simpsons';
import logo from './img/lunatic-logo.png';
import './custom-lunatic.scss';

const Orchestrator = () => {
	const [variables, setVariables] = useState(lunatic.getInitialState(simspons));
	const onChange = up => {
		const [name, value] = Object.entries(up)[0];
		setVariables({
			...variables,
			COLLECTED: {
				...variables.COLLECTED,
				[name]: { ...variables.COLLECTED[name], COLLECTED: value },
			},
		});
	};
	const components = simspons.components //.filter(({ componentType }) => componentType === 'Datepicker')
		.map(q => {
			const { id, componentType } = q;
			const Component = lunatic[componentType];
			return (
				<div className="lunatic lunatic-component" key={`component-${id}`}>
					<Component {...q} handleChange={onChange} labelPosition="TOP" />
				</div>
			);
		});
	console.log(variables);
	return (
		<>
			<div className="lunatic-img">
				<img alt="lunatic" src={logo} />
			</div>
			<div className="container">
				<div className="components">{components}</div>
				<div className="state">
					<h1 className="centered">Collected</h1>
					<div>
						{Object.entries(variables.COLLECTED).map(([key, values]) => (
							<div key={`state-${key}`}>{`${key} : ${values.COLLECTED}`}</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Orchestrator;
