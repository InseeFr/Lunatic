import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceDeclarations from './source-declarations.json';
import sourceMessages from './source-messages.json';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Sequence',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const WithDeclarations = Template.bind({});
WithDeclarations.args = {
	id: 'sequence-declarations',
	source: sourceDeclarations,
};

export const WithMessages = Template.bind({});
WithMessages.args = { id: 'sequence-messages', source: sourceMessages };
