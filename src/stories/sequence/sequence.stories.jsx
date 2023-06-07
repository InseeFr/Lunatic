import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceDeclarations from './source-declarations.json';
// import sourceQuestions from './source-questions.json';
import afterInSeq from './afterInSeq.json';
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

// export const WithQuestions = Template.bind({});
// WithQuestions.args = { id: 'sequence-questions', source: sourceQuestions };

export const afterSeq = Template.bind({});
afterSeq.args = { id: 'sequence-after', source: afterInSeq };
