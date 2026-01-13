import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceGlobalVariables from './sourceGlobalVariables.json';

import { Meta } from '@storybook/react';

import { dataFromObject } from '../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Pairwise',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
		data: dataFromObject({
			PRENOM: ['Dad', 'Mom', 'Unknow'],
			AGE: [30, 29, 5],
			LINKS: [[null]],
			OTHER: [[null]],
		}),
		initialPage: '3',
	},
};

export const GlobalVariables: OrchestratorStory = {
	args: {
		source: sourceGlobalVariables,
	},
};
