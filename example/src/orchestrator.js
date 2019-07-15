import React, { useState } from 'react';
import * as lunatic from '@inseefr/lunatic';
import simspons from './simpsons';
import './custom-lunatic.scss';

const Orchestrator = () => {
	const [variables, setVariables] = useState(lunatic.getInitialState(simspons));
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
			<div className="container">
				<div className="components">{components}</div>
				<div className="state">
					<h1 className="centered">Collected</h1>
					<div>
						{Object.entries(variables.COLLECTED).map(([key, values]) => (
							<div>{`${key} : ${values.COLLECTED}`}</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Orchestrator;
