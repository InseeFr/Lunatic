import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import simpsons from './source';
import defaultArgTypes from '../../utils/default-arg-types';

const stories = {
	title: 'Questionnaires/Simpsons',
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
export const Default = Template.bind({});

Default.args = {
	id: 'simpsons-default',
	source: simpsons,
	pagination: true,
};
