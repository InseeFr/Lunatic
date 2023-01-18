import React, { useState } from 'react';
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
	unnecessary,
	goToIteration,
	locked,
	custom,
}) {
	return (
		<RoundaboutItContainer custom={custom}>
			<RoundaboutItTitle label={label} custom={custom} />
			<RoundaboutItButton
				partial={partial}
				complete={complete}
				unnecessary={unnecessary}
				goToIteration={goToIteration}
				iteration={index}
				locked={locked}
				custom={custom}
			/>
		</RoundaboutItContainer>
	);
}

function Roundabout({
	iterations,
	expressions,
	goToIteration,
	label,
	locked,
	custom,
}) {
	const {
		complete = new Array(iterations),
		partial = new Array(iterations),
		label: iterationLabels = new Array(iterations),
		unnecessary = new Array(iterations),
	} = expressions;

	if (iterationLabels !== undefined && partial !== undefined) {
		const subElements = new Array(iterations).fill(null).map(function (_, i) {
			return (
				<RoundaboutIteration
					key={i}
					index={i}
					label={iterationLabels[i]}
					complete={complete[i]}
					partial={partial[i]}
					unnecessary={unnecessary[i]}
					goToIteration={goToIteration}
					locked={locked}
					custom={custom}
				/>
			);
		});
		return (
			<RoundaboutContainer custom={custom}>
				<RoundaboutLabel value={label} custom={custom} />
				{subElements}
			</RoundaboutContainer>
		);
	}
	return <RoundaboutPending custom={custom} />;
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
