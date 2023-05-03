import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import ticweb from './source';
import defaultArgTypes from '../../utils/default-arg-types';

const stories = {
	title: 'Questionnaires2023/ticweb',
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
	id: 'ticweb-default',
	source: ticweb,
	pagination: true,
	data: { COLLECTED: { READY: { COLLECTED: true } } },
};
