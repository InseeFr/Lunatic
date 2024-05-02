import React from 'react';
import defaultArgTypes from '../../utils/default-arg-types';
import Orchestrator from '../../utils/orchestrator';
import source from './source.json';

const stories = {
	title: 'Behaviour/Missing',
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
	pagination: true,
	missing: true,
	source,
	shortcut: true,
	missingShortcut: { dontKnow: 'f2', refused: 'f4' },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	...Default.args,
	readOnly: true,
};
