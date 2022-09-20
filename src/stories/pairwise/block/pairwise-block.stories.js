import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import block from './block';
import defaultArgTypes from '../../utils/default-arg-types';
import data from './data';

const stories = {
	title: 'Pairwise/Block',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'block', source: block, pagination: true, data };
