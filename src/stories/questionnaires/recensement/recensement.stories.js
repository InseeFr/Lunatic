import Orchestrator from '../../utils/orchestrator';
import React from 'react';
import data from './data';
import defaultArgTypes from '../../utils/default-arg-types';
import source from './source';

const stories = {
	title: 'Questionnaires/Recensement',
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
		management: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: false,
		},
		autofocus: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: false,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'logement-default',
	source,
	data,
	pagination: true,
};
