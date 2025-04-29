import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';
import { Meta } from '@storybook/react';
import { Logger } from '../../../utils/logger';

const meta: Meta<typeof Orchestrator> = {
	title: 'Questionnaires/Simpsons',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const WithMissing: OrchestratorStory = {
	args: {
		source,
		missing: true,
		missingStrategy: () => {
			Logger.info('your strategy has been applied');
		},
	},
};
