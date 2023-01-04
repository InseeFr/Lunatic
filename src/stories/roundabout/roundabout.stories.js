import { useCallback } from 'react';
import classnames from 'classnames';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Roundabout',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

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
		<button
			className={classnames('roundabout-it-button', status)}
			disabled={status === 'complete' && locked}
			onClick={onClick}
		>
			{label}
		</button>
	);
}

RoundaboutItButton.defaultProps = {
	locked: true,
};

const custom = { RoundaboutItButton };

const Template = (args) => <Orchestrator {...args} custom={custom} />;
export const Default = Template.bind({});

Default.args = { id: 'roundabout', source, pagination: true, data };
