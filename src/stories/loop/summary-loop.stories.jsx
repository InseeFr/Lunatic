import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceSummary from './source-summary';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Loop/SummaryLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'summary-loop', source: sourceSummary };
