import React, { useState, useEffect } from 'react';
import Orchestrator from './orchestrator';

const Switch = ({ source, data, error }) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (ready) setReady(false);
		// Assume the hack to reload Questionnaire
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [source, data]);

	if (!ready)
		return (
			<div className="centered">
				<button
					type="button"
					className="btn-vizu"
					onClick={() => {
						setReady(true);
					}}
				>
					Visualize
				</button>
			</div>
		);
	return <Orchestrator source={source} data={data} error={error} />;
};

export default Switch;
