import React, { useState } from 'react';
import * as lunatic from '@inseefr/lunatic';
import simspons from './simpsons';
import './custom-lunatic.scss';

const Orchestrator = () => {
	const [variables, setVariables] = useState({});
	const components = simspons.components.map(q => {
		const { id, componentType } = q;
		const Component = lunatic[componentType];
		return (
			<div className="lunatic lunatic-component" key={`component-${id}`}>
				<Component {...q} handleChange={setVariables} labelPosition="TOP" />
			</div>
		);
	});
	return (
		<>
			<div className="lunatic-img">
				<img alt="lunatic" src="/images/lunatic-logo.png" />
			</div>
			<div className="container">{components}</div>
		</>
	);
};

export default Orchestrator;
