import React, { useCallback } from 'react';
import classnames from 'classnames';
import Button from '../button';
import { createCustomizableLunaticField } from '../commons';

function RoundaboutItTitle({ label }) {
	return <div className="roundabout-it-title">{label}</div>;
}

function getStatus(complete, partial) {
	if (complete) {
		return 'complete';
	}
	if (partial) {
		return 'partial';
	}
	return 'unstarted';
}

function getLabel(complete, partial) {
	if (complete) {
		return 'Complété';
	}
	if (partial) {
		return 'Modifier';
	}
	return 'Commencer';
}

function RoundaboutItButton({ complete, partial, iteration, goToIteration }) {
	const status = getStatus(complete, partial);
	const label = getLabel(complete, partial);

	const onClick = useCallback(
		function () {
			goToIteration(iteration);
		},
		[iteration, goToIteration]
	);

	return (
		<Button
			className={classnames('roundabout-it-button', status)}
			disabled={status === 'complete'}
			onClick={onClick}
		>
			{label}
		</Button>
	);
}

function RoundaboutItContainer({ children }) {
	return <div className="roundabout-iteration-title">{children}</div>;
}

function RoundaboutContainer({ children }) {
	return <div className="lunatic-roundabout">{children}</div>;
}

function RoundaboutPending() {
	return <div className="roundabout-pending">Pending...</div>;
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

function Roundabout({ iterations, label, complete, partial, goToIteration }) {
	if (label !== undefined && label !== undefined && partial !== undefined) {
		const subElements = new Array(iterations).fill(null).map(function (_, i) {
			return (
				<Iteration
					key={i}
					index={i}
					label={label[i]}
					complete={complete[i]}
					partial={partial[i]}
					goToIteration={goToIteration}
				/>
			);
		});
		return <RoundaboutContainer>{subElements}</RoundaboutContainer>;
	}
	return <RoundaboutPending />;
}

export default createCustomizableLunaticField(Roundabout, 'Roundabout');
