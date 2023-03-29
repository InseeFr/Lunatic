import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source.json';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Textarea',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'input', source, data };
