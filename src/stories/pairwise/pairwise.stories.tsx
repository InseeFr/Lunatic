import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import pairwiseLoop from './sourcePairwiseLoop.json';
import sourceGlobalVariables from './sourceGlobalVariables.json';

import { Meta } from '@storybook/react';

import { dataFromObject } from '../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/PairwiseLinks',
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
		data: dataFromObject({
			PRENOM: ['Dad', 'Mom', 'Son', 'Daughter'],
			SEXE: ['1', '2', '1', '2'],
		}),
	},
};

export const PairwiseLoop: OrchestratorStory = {
	args: {
		source: pairwiseLoop,
		data: dataFromObject({
			PRENOM: ['Dad', 'Mom', 'Son', 'Daughter'],
			SEXE: ['1', '2', '1', '2'],
		}),
		initialPage: '2',
	},
};
