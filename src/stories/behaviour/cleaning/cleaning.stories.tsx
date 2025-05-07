import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';
import sourceLoop from './source-loop.json';
import sourceLoopScopes from './source-loop-scopes.json';

import { Meta } from '@storybook/react';

import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Cleaning',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const Loop: OrchestratorStory = {
	args: {
		source: sourceLoop,
	},
};

export const LoopWithMixedScopes: OrchestratorStory = {
	args: {
		source: sourceLoopScopes,
		data: dataFromObject({
			PRENOM: ['Laurent', 'Alain', 'toto'],
		}),
	},
};
