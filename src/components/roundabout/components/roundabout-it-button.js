import React, { useCallback } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../commons';
import Button from '../../button';

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

function RoundaboutItButton({
	complete,
	partial,
	iteration,
	goToIteration,
	locked,
}) {
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
			disabled={status === 'complete' && locked}
			onClick={onClick}
		>
			{label}
		</Button>
	);
}

RoundaboutItButton.defaultProps = {
	locked: true,
};

export default createCustomizableLunaticField(
	RoundaboutItButton,
	'RoundaboutItButton'
);
