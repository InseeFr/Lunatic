import Orchestrator from '../../utils/orchestrator';
import React from 'react';
import defaultArgTypes from '../../utils/default-arg-types';
import simpsons from './source';

const dontKnow = <span>Alternative don't know</span>;
const refusal = <span>Alternative refusal</span>;

const stories = {
	title: 'Questionnaires/MissingOverriden',
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
	id: 'simpsons-default',
	source: simpsons,
	pagination: true,
	data: { COLLECTED: { READY: { COLLECTED: true } } },
	refusedButton: refusal,
	dontKnowButton: dontKnow,
};
