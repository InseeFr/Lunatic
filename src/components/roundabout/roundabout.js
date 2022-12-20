import React from 'react';
import PropTypes from 'prop-types';
import { createCustomizableLunaticField } from '../commons';
import RoundaboutLabel from './components/roundabout-label';
import RoundaboutPending from './components/roundabout-pending';
import RoundaboutContainer from './components/roundabout-container';
import RoundaboutItContainer from './components/roundabout-it-container';
import RoundaboutItButton from './components/roundabout-it-button';
import RoundaboutItTitle from './components/roundabout-it-title';

function RoundaboutIteration({
	label,
	index,
	complete,
	partial,
	goToIteration,
	locked,
}) {
	return (
		<RoundaboutItContainer>
			<RoundaboutItTitle label={label} />
			<RoundaboutItButton
				partial={partial}
				complete={complete}
				goToIteration={goToIteration}
				iteration={index}
				locked={locked}
			/>
		</RoundaboutItContainer>
	);
}

function Roundabout({ iterations, expressions, goToIteration, label, locked }) {
	const { complete, partial, label: iterationLabels } = expressions;
	if (
		iterationLabels !== undefined &&
		iterationLabels !== undefined &&
		partial !== undefined
	) {
		const subElements = new Array(iterations).fill(null).map(function (_, i) {
			return (
				<RoundaboutIteration
					key={i}
					index={i}
					label={iterationLabels[i]}
					complete={complete[i]}
					partial={partial[i]}
					goToIteration={goToIteration}
					locked={locked}
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

Roundabout.propTypes = {
	iterations: PropTypes.number.isRequired,
	expressions: PropTypes.shape({
		label: PropTypes.arrayOf(PropTypes.string).isRequired,
		partial: PropTypes.arrayOf(PropTypes.bool).isRequired,
		complete: PropTypes.arrayOf(PropTypes.bool).isRequired,
	}).isRequired,
	goToIteration: PropTypes.func.isRequired,
	label: PropTypes.string,
	locked: PropTypes.bool,
};

Roundabout.defaultProps = { label: undefined, locked: true };

export default createCustomizableLunaticField(Roundabout, 'Roundabout');
