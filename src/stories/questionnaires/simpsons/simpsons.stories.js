import Orchestrator from '../../utils/orchestrator';
import React from 'react';
import defaultArgTypes from '../../utils/default-arg-types';
import simpsons from './source';

const stories = {
	title: 'Questionnaires/Simpsons',
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
		shortcut: {
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
	id: 'Default',
	source: simpsons,
	pagination: true,
	data: { COLLECTED: { READY: { COLLECTED: true } } },
};

export const With_Missing = Template.bind({});

With_Missing.args = {
	id: 'With-missing',
	source: simpsons,
	pagination: true,
	missingStrategy: () => {
		console.log('your strategy has been applied');
	},
	dontKnowButton: 'I dunno',
	refusedButton: 'Oh no!',
	data: { COLLECTED: { READY: { COLLECTED: true } } },
};
