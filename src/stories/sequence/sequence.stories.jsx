import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceDeclarations from './source-declarations.json';
import source from './source.json';
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

export const Default = Template.bind({});
Default.args = {
	id: 'sequence-simple',
	source: source,
};

export const WithDeclarations = Template.bind({});
WithDeclarations.args = {
	id: 'sequence-declarations',
	source: sourceDeclarations,
};
