import Orchestrator from '../utils/orchestrator';
import React from 'react';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';
import source from './sourceWithHierarchy';
import sourceLoop from './sourceLoop.json';
import dataLoop from './dataLoop.json';

const stories = {
	title: 'Behaviour/Overview',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'overview', source, showOverview: true, data };

export const WithLoop = Template.bind({});
WithLoop.args = {
	source: sourceLoop,
	showOverview: true,
	data: dataLoop.data,
	lastReachedPage: '11.2#2',
};
