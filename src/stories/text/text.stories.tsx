import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';
import sourceRoster from './source-roster.json';
import sourceTable from './source-table.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Text',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};
export const Roster: Story = {
	args: {
		source: sourceRoster,
		data: {
			EXTERNAL: {
				VARIABLE_EXT: ['TRUC', 'BIDULE', 'CHOSE'],
			},
		},
	},
};
export const Table: Story = {
	args: {
		source: sourceTable,
	},
};
