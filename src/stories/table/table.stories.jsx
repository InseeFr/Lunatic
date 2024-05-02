import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source.json';
import data from './data.json';
import sourceColspan from './source-colspan.json';
import sourceDynamic from './table-dynamique.json';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Table',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = { id: 'table', source: source, data: data };

export const Colspan = Template.bind({});
Colspan.args = { id: 'table', source: sourceColspan };

export const DynamicTable = Template.bind({});

DynamicTable.args = {
	id: 'dynamic-table',
	source: sourceDynamic,
};
