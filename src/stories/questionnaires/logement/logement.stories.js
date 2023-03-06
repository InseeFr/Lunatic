import Orchestrator from '../../utils/orchestrator';
import React from 'react';
import data from './data';
import defaultArgTypes from '../../utils/default-arg-types';
import logement from './source';
import logementSequence from './source-sequence';
import logementSum from './source-sum';

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
		management: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: false,
		},
		showOverview: {
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
	source: logement,
	data,
	pagination: true,
	autofocus: true,
};

export const DefaultSum = Template.bind({});

DefaultSum.args = {
	id: 'logement-sum',
	source: logementSum,
	pagination: true,
	autofocus: true,
};

export const Sequence = Template.bind({});

Sequence.args = {
	id: 'logement-sequence',
	source: logementSequence,
	data,
	pagination: true,
	autofocus: true,
};
