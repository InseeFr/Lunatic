import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import data from './data.json';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Summary',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'Summary',
	source,
	data,
	pagination: true,
};
