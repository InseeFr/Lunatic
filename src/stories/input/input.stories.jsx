import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceQuestion from './source-with-question';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Input',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'input', source, data };

export const WithQuestion = Template.bind({});

WithQuestion.args = { id: 'input', source: sourceQuestion, data };
