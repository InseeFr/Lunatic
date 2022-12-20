import React from 'react';
import { createCustomizableLunaticField } from '../commons';
import RoundaboutLabel from './components/roundabout-label';
import RoundaboutPending from './components/roundabout-pending';
import RoundaboutContainer from './components/roundabout-container';
import RoundaboutItContainer from './components/roundabout-it-container';
import RoundaboutItButton from './components/roundabout-it-button';

function RoundaboutItTitle({ label }) {
	return <div className="roundabout-it-title">{label}</div>;
}

function Iteration({ label, index, complete, partial, goToIteration }) {
	return (
		<RoundaboutItContainer>
			<RoundaboutItTitle label={label} />
			<RoundaboutItButton
				partial={partial}
				complete={complete}
				goToIteration={goToIteration}
				iteration={index}
			/>
		</RoundaboutItContainer>
	);
}

function Roundabout({ iterations, expressions, goToIteration, label }) {
	const { complete, partial, label: iterationLabels } = expressions;
	if (
		iterationLabels !== undefined &&
		iterationLabels !== undefined &&
		partial !== undefined
	) {
		const subElements = new Array(iterations).fill(null).map(function (_, i) {
			return (
				<Iteration
					key={i}
					index={i}
					label={iterationLabels[i]}
					complete={complete[i]}
					partial={partial[i]}
					goToIteration={goToIteration}
				/>
			);
		});
		return (
			<RoundaboutContainer>
				<RoundaboutLabel value={label} />
				{subElements}
			</RoundaboutContainer>
		);
	}
	return <RoundaboutPending />;
}

export default createCustomizableLunaticField(Roundabout, 'Roundabout');
