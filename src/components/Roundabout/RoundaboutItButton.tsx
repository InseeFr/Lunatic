import React, { useCallback } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { Button } from '../shared/Button/Button';

type Props = {
	complete?: boolean;
	partial?: boolean;
	iteration: number;
	unnecessary?: boolean;
	goToIteration: (n: number) => void;
	locked?: boolean;
};

export const RoundaboutItButton = slottableComponent<Props>(
	'RoundaboutItButton',
	({
		complete,
		partial,
		iteration,
		unnecessary,
		goToIteration,
		locked = true,
	}: Props) => {
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
);

function getStatus(complete?: boolean, partial?: boolean) {
	if (complete) {
		return 'complete';
	}
	if (partial) {
		return 'partial';
	}
	return 'unstarted';
}

function getLabel({
	complete,
	partial,
	unnecessary,
}: {
	complete?: boolean;
	partial?: boolean;
	unnecessary?: boolean;
}) {
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

function isDisabled({
	status,
	locked,
	unnecessary,
}: {
	status?: string;
	locked?: boolean;
	unnecessary?: boolean;
}) {
	if (unnecessary || (status === 'complete' && locked)) {
		return true;
	}

	return false;
}
