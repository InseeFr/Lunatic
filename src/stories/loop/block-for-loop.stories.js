import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source-block';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Loop/BlockForLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'roster-for-loop', source };
