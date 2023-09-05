import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceComponentset from './sourceComponentset';
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
	id: 'checkboxGroup',
	source: sourceComponentset,
	shortcut: true,
};
