import React from 'react';
import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import data from './data';
import source from './sourceWithHierarchy';
import sourceLoop from './withLoop';

const stories = {
	title: 'Behaviour/Overview',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});
export const WithLoop = Template.bind({});

Default.args = { id: 'overview', source, showOverview: true, data };
WithLoop.args = {
	id: 'overview-loop',
	source: sourceLoop,
	showOverview: true,
	data,
};
