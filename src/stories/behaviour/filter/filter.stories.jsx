import React from 'react';
import defaultArgTypes from '../../utils/default-arg-types';
import Orchestrator from '../../utils/orchestrator';
import source from './source.json';
import sourceLoop from './sourceLoop.json';
import dataLoop from './dataLoop.json';

const stories = {
	title: 'Behaviour/Filter',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		disableFilters: {
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
	disableFilters: false,
	source,
};

export const WithLoop = Template.bind({});
WithLoop.args = {
	disableFilters: false,
	source: sourceLoop,
	data: dataLoop.data,
};
