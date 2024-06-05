import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceLoop from './sourceLoop';
import sourceDetail from './sourceDetail';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/CheckboxGroup',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		shortcut: {
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
	id: 'checkboxGroup',
	source,
	shortcut: true,
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
	source,
	readOnly: true,
	shortcut: true,
};

export const Arbitrary = Template.bind({});
Arbitrary.args = {
	source: sourceDetail,
	shortcut: true,
};

export const Loop = Template.bind({});

Loop.args = {
	...Default.args,
	source: sourceLoop,
};
