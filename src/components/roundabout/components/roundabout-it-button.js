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

function getLabel({ complete, partial, unnecessary }) {
	if (unnecessary) {
		return 'Non concerné';
	}
	if (complete) {
		return 'Complété';
	}
	if (partial) {
		return 'Modifier';
	}
	return 'Commencer';
}

function isDisabled({ status, locked, unnecessary }) {
	if (unnecessary || (status === 'complete' && locked)) {
		return true;
	}

	return false;
}

function RoundaboutItButton({
	complete,
	partial,
	iteration,
	unnecessary,
	goToIteration,
	locked,
}) {
	const status = getStatus(complete, partial);
	const label = getLabel({ complete, partial, unnecessary });

	const onClick = useCallback(
		function () {
			goToIteration(iteration);
		},
		[iteration, goToIteration]
	);

	return (
		<Button
			className={classnames('roundabout-it-button', status)}
			disabled={isDisabled({ status, locked, unnecessary })}
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
