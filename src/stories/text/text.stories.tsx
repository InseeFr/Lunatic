import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceRoster from './source-roster.json';
import sourceTable from './source-table.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Text',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};
export const Roster: OrchestratorStory = {
	args: {
		source: sourceRoster,
		data: {
			EXTERNAL: {
				VARIABLE_EXT: ['TRUC', 'BIDULE', 'CHOSE'],
			},
		},
	},
};
export const Table: OrchestratorStory = {
	args: {
		source: sourceTable,
	},
};
