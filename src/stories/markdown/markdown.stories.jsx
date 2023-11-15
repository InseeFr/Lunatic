<<<<<<<< HEAD:src/stories/markdown/markdown.stories.jsx
import React from 'react';
import Orchestrator from '../utils/orchestrator';
import defaultArgTypes from '../utils/default-arg-types';
import source from './source.json';

const stories = {
	title: 'Components/Markdown',
========
import Orchestrator from '../utils/orchestrator';
import source from './source';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/QuestionContext',
>>>>>>>> 065af906 (ref: cleaned stories):src/stories/question-context/question-context.stories.jsx
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

<<<<<<<< HEAD:src/stories/markdown/markdown.stories.jsx
Default.args = {
	id: 'markdown',
	source: source,
};
========
Default.args = { id: 'questionExplication', source };
>>>>>>>> 065af906 (ref: cleaned stories):src/stories/question-context/question-context.stories.jsx
