import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceBloc from './source-bloc.json';
import sourcePaginated from './source-paginated.json';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Loop/Loop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = { id: 'loop', source: sourceBloc };

export const Paginated = Template.bind({});
Paginated.args = {
	id: 'loop-paginated',
	source: sourcePaginated,
	initialPage: '1',
	data: {},
};

export const ReadOnly = Template.bind({});
ReadOnly.args = { id: 'bloc-for-loop', source: sourceBloc, readOnly: true };
