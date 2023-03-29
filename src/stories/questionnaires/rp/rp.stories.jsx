import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import data from './data';
import source from './source';
import defaultArgTypes from '../../utils/default-arg-types';

const stories = {
	title: 'Questionnaires/RP',
	component: Orchestrator,
	argTypes: { ...defaultArgTypes },
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'rp-default',
	source,
	data,
	pagination: true,
};
