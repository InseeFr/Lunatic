import React from 'react';
import Orchestrator from '../utils/orchestrator';
import simpsons from './source';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Questionnaires-PasteYour/Paste',
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
		source: {
			table: { disable: false },
			control: { type: 'object' },
			defaultValue: simpsons,
		},
		data: {
			table: { disable: false },
			control: { type: 'object' },
			defaultValue: { COLLECTED: { READY: { COLLECTED: true } } },
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'simpsons-default',
	pagination: true,
};
