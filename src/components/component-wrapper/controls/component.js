import React, { useState, useEffect } from 'react';
import * as U from '../../../utils/lib';
import { interpret } from '../../../utils/to-expose/interpret';
import './controls.scss';

const Controls = ({ Component, props }) => {
	// handle responses & cells
	const { response, preferences, missingResponse } = props;
	const [applyControls, setApplyControls] = useState(
		() => U.getResponseByPreference(preferences)(response) !== null
	);

	useEffect(() => {
		if (!applyControls) {
			if (U.getResponseByPreference(preferences)(response) !== null) {
				setApplyControls(true);
			}
		}
	}, [response, applyControls, preferences]);

	const hasMissingResponse =
		U.getResponseByPreference(preferences)(missingResponse) !== null;

	const { controls, features, bindings } = props;
	const featuresWithoutMD = features.filter((f) => f !== 'MD');
	const filteredControls =
		!applyControls && !hasMissingResponse
			? []
			: controls.filter((control) => {
					const { bindingDependencies, control: formula } = control;
					const reducedBindings = (bindingDependencies || []).reduce(
						(acc, bD) => ({ ...acc, [bD]: bindings[bD] }),
						{}
					);
					const vectorialBindings = U.buildVectorialBindings(reducedBindings);
					return (
						interpret(featuresWithoutMD)(vectorialBindings)(formula) !== true
					);
			  }, []);
	return (
		<>
			<Component {...props} />
			<div className="lunatic-controls">
				{filteredControls.map(({ id, errorMessage }) => (
					<div key={`control-${id}`} className="lunatic-control">
						{errorMessage}
					</div>
				))}
			</div>
		</>
	);
};

export default Controls;
