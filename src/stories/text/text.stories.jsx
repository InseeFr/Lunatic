import Orchestrator from '../utils/orchestrator';
import source from './source.json';
import sourceRoster from './source-roster.json';
import dataRoster from './data-roster.json';
import sourceTable from './source-table.json';
import defaultArgTypes from '../utils/default-arg-types';

const meta = {
	title: 'Components/Text',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default meta;

export const Text = { args: { id: 'table', source: source } };

export const Roster = { args: { source: sourceRoster, data: dataRoster } };

export const Table = { args: { source: sourceTable } };
