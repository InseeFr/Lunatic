import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceComponentset from './sourceComponentset';
import sourceWithCondition from './sourceWithCondition.json';
import sourceLoop from './sourceLoop';
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

export const ComponentSet = Template.bind({});

ComponentSet.args = {
	...Default.args,
	source: sourceComponentset,
};

export const Loop = Template.bind({});

Loop.args = {
	...Default.args,
	source: sourceLoop,
};

export const WithCondition = Template.bind({});

WithCondition.args = {
	...Default.args,
	source: sourceWithCondition,
};
