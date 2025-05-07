import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';
import data from './data.json';
import sourceSum from './source-sum.json';
import sourceSequence from './source-sequence.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Questionnaires/Logement',
	...OrchestratorMeta,
	args: {
		data,
		source,
	},
};

export default meta;

export const Default: OrchestratorStory = {};
export const Sum: OrchestratorStory = { args: { source: sourceSum } };
export const Sequence: OrchestratorStory = { args: { source: sourceSequence } };
