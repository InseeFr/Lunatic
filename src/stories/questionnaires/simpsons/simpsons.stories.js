import Orchestrator from '../../utils/orchestrator';
import React from 'react';
import defaultArgTypes from '../../utils/default-arg-types';
import simpsons from './source';

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
		autofocus: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
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
	autofocus: true,
	data: { COLLECTED: { READY: { COLLECTED: true } } },
};
