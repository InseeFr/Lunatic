import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceRoster from './source-roster';
import defaultArgTypes from '../utils/default-arg-types';
import sourceWithHeader from './source-with-header.json';

const stories = {
	title: 'Components/Loop/RosterForLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});
export const ReadOnly = Template.bind({});

Default.args = { id: 'roster-for-loop', source: sourceRoster };
ReadOnly.args = { id: 'roster-for-loop', source: sourceRoster, readOnly: true };

export const WithHeader = Template.bind({});
WithHeader.args = { id: 'roster-for-loop-headers', source: sourceWithHeader };
