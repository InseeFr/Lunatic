import React, { useState, useEffect } from 'react';
import './controls.scss';

function Controls() {
	return <></>;
}

// const Controls = ({ Component, props }) => {
// 	// handle responses & cells
// 	const {
// 		response,
// 		responses,
// 		cells,
// 		components,
// 		preferences,
// 		missingResponse,
// 		savingType,
// 	} = props;
// 	// savingType or preferences[preferences.length-1]?
// 	const [applyControls, setApplyControls] = useState(() =>
// 		U.hasToCleanMissing(savingType)({ response, responses, cells, components })
// 	);

// 	useEffect(() => {
// 		if (!applyControls) {
// 			if (
// 				U.hasToCleanMissing(savingType)({
// 					response,
// 					responses,
// 					cells,
// 					components,
// 				})
// 			) {
// 				setApplyControls(true);
// 			}
// 		}
// 	}, [response, responses, cells, components, applyControls, savingType]);

// 	const hasMissingResponse =
// 		U.getResponseByPreference(preferences)(missingResponse) !== null;

// 	const { controls, features, bindings } = props;
// 	const featuresWithoutMD = features.filter((f) => f !== 'MD');
// 	const filteredControls =
// 		(!applyControls && !hasMissingResponse) || !controls
// 			? []
// 			: controls.filter((control) => {
// 					const { bindingDependencies, control: formula } = control;
// 					const reducedBindings = (bindingDependencies || []).reduce(
// 						(acc, bD) => ({ ...acc, [bD]: bindings[bD] }),
// 						{}
// 					);
// 					const vectorialBindings = U.buildVectorialBindings(reducedBindings);
// 					return (
// 						interpret(featuresWithoutMD)(vectorialBindings)(formula) !== true
// 					);
// 			  }, []);
// 	return (
// 		<>
// 			<Component {...props} />
// 			<div className="lunatic-controls">
// 				{filteredControls.map(({ id, errorMessage }) => (
// 					<div key={`control-${id}`} className="lunatic-control">
// 						{errorMessage}
// 					</div>
// 				))}
// 			</div>
// 		</>
// 	);
// };

export default Controls;
