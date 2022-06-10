import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import logement from './source';
import data from './data';
import defaultArgTypes from '../../utils/default-arg-types';

const stories = {
	title: 'Questionnaires/Logement',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		missing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		activeGoNextForMissing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'simpsons-default',
	source: logement,
	data,
	pagination: true,
};
