import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';

import { Meta } from '@storybook/react';
import { times } from '../../../utils/array';
import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Performance',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
		data: dataFromObject({
			PRENOM: times(200, (k) => `John${k}`),
			NOM: times(200, (k) => `Doe${k}`),
			AGE: times(200, (k) => k + 1),
			BIRTHDAY: times(200, (k) => `2${k.toString().padStart(3, '0')}-01-01`),
		}),
	},
};
