import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';
import sourceLoop from './sourceLoop.json';

import { Meta } from '@storybook/react';

import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Filter',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const WithLoop: OrchestratorStory = {
	args: {
		source: sourceLoop,
		data: dataFromObject({
			NBHAB: 2,
			NAME: ['Jean', 'Paul'],
		}),
	},
};
