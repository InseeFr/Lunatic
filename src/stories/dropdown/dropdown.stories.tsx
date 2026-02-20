import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceDynamicOptions from './sourceDynamicOptions.json';

import { Meta } from '@storybook/react';

import { dataFromObject } from '../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Dropdown',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
		data: dataFromObject({
			STATE: '2',
			STATE2: '3',
		}),
	},
};

export const DynamicOptions: OrchestratorStory = {
	args: {
		source: sourceDynamicOptions,
		data: dataFromObject({
			NBHAB: 3,
			PRENOM: ['Verso', 'Maëlle', 'Aline'],
			AGE: [30, 16, 50],
		}),
	},
};
