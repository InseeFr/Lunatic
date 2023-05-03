import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import defaultArgTypes from '../../utils/default-arg-types';
import source from './controls-externes.json';

const stories = {
	title: 'Questionnaires-Tests/Controls-externes',
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
		activeControls: {
			control: 'boolean',
			defaultValue: true,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const BoucleN = Template.bind({});

BoucleN.args = {
	id: 'externes',
	pagination: true,
	activeControls: true,
	source,
};
