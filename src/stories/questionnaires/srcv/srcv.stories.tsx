import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';
import data from './data.json';
import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Questionnaires/Srcv',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
		data: data.data,
		showOverview: true,
	},
};
