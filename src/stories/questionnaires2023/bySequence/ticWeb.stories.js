import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import bysequence from './source';
import defaultArgTypes from '../../utils/default-arg-types';

const stories = {
	title: 'Questionnaires2023/bysequence',
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
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'bysequence-default',
	source: bysequence,
	pagination: true,
	data: { COLLECTED: { READY: { COLLECTED: true } } },
};
