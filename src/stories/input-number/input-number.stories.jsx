import React from 'react';
import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import source from './source';

const stories = {
	title: 'Components/InputNumber',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'input-number', source };
