import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';
import interrogation from './data.json';
import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Questionnaires/SRCV',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
		data: interrogation.data,
		initialPage: '179',
	},
};
