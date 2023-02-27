import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceBloc from './source-bloc.json';
import sourceWithHeader from './source-with-header.json';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Loop/BlockForLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = { id: 'bloc-for-loop', source: sourceBloc };

export const WithHeader = Template.bind({});
WithHeader.args = { id: 'bloc-for-loop-headers', source: sourceWithHeader };
