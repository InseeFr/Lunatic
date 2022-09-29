import React from 'react';
import Orchestrator from '../utils/orchestrator';
import links from './links';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'PairwiseLinks',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'links', source: links, pagination: true, data };
