import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';

import { Meta } from '@storybook/react';
import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Questionnaires/Recensement',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
		data: dataFromObject({
			PRENOM: [null],
			AGE: [null],
			LINKS: [[null]],
			OTHER: [[null]],
		}),
	},
};
