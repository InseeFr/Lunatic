import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceWithCondition from './sourceWithCondition.json';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Dropdown',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});
Default.args = {
	id: 'dropdown',
	source,
	data,
	disabled: false,
	editable: false,
	writable: true,
};

export const WithCondition = Template.bind({});
Default.args = {
	id: 'dropdown',
	source: sourceWithCondition,
	disabled: false,
	editable: false,
	writable: true,
};
