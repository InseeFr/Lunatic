import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import sample from './sample';
import defaultArgTypes from '../../utils/default-arg-types';

const stories = {
	title: 'Questionnaires/Samples',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		missing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		activeGoNextForMissing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		management: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: false,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Sample = Template.bind({});

Sample.args = {
	id: 'sample',
	source: sample,
	pagination: true,
};
