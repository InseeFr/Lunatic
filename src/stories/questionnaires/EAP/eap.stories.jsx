import React from 'react';
import defaultArgTypes from '../../utils/default-arg-types';
import Orchestrator from '../../utils/orchestrator';
import data from './data';
import eapQuestionnaire from './source';

const stories = {
	title: 'Questionnaires/EAP',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'eap-mvp',
	source: eapQuestionnaire,
	pagination: true,
	data,
};
