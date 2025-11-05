import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';
import sourceResizingCleaning from './source-resizing-cleaning.json';
import sourceCalculating from './source-calculating.json';

import { Meta } from '@storybook/react';

import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Resizing',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const ResizingWithCleaning: OrchestratorStory = {
	args: {
		source: sourceResizingCleaning,
		data: dataFromObject({
			NBHAB: 2,
			NAME: ['Jean', 'Paul'],
		}),
	},
};

export const Calculating: OrchestratorStory = {
	args: {
		source: sourceCalculating,
	},
};
