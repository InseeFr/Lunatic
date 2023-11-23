import React from 'react';
import * as custom from '../custom-mui';
import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import dataRoster from './data-roster.json';
import data from './data.json';
import sourceColspan from './source-colspan.json';
import sourceRoster from './source-roster.json';
import source from './source.json';
import sourceDynamic from './table-dynamique.json';

const stories = {
	title: 'Components/Table',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = { id: 'table', source, data };

export const Roster = Template.bind({});
Roster.args = { id: 'table', source: sourceRoster, data: dataRoster };

export const RosterMui = Template.bind({});
RosterMui.args = {
	id: 'table',
	source: sourceRoster,
	data: dataRoster,
	custom,
};

export const DynamicTable = Template.bind({});

DynamicTable.args = {
	id: 'dynamic-table',
	source: sourceDynamic,
};

export const ColspanTable = Template.bind({});
ColspanTable.args = {
	id: 'colspan-table',
	source: sourceColspan,
};
