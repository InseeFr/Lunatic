import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceWithCondition from './sourceWithCondition.json';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/CheckboxOne',
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
Default.args = { id: 'checkboxOne', source, shortcut: false };

export const WithCondition = Template.bind({});
WithCondition.args = {
	id: 'checkboxOneCondition',
	source: sourceWithCondition,
	shortcut: false,
};
