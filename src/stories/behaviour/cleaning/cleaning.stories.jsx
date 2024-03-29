import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import source from './source.json';
import sourceLoop from './source-loop.json';
import defaultArgTypes from '../../utils/default-arg-types';

const stories = {
	title: 'Behaviour/Cleaning',
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
		activeControls: {
			control: 'boolean',
			defaultValue: true,
		},
		source: {
			table: { disable: false },
			control: { type: 'object' },
			defaultValue: source,
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
	id: 'cleaning-default',
	pagination: true,
	source,
};
export const Loop = Template.bind({});
Loop.args = {
	id: 'cleaning-loop',
	pagination: true,
	source: sourceLoop,
};
