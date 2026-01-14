import {
	Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceHorizontal from './sourceHorizontal.json';
import sourceDetail from './sourceDetail.json';
import sourceCondition from './sourceCondition.json';
import sourceDynamicOptions from './sourceDynamicOptions.json';

import { Meta } from '@storybook/react';
import { dataFromObject } from '../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Radio',
	...OrchestratorMeta,
	args: {
		...OrchestratorMeta.args,
		shortcut: true,
	},
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const Condition: OrchestratorStory = {
	args: {
		source: sourceCondition,
	},
};

export const Horizontal: OrchestratorStory = {
	args: {
		source: sourceHorizontal,
	},
};

export const ReadOnly: OrchestratorStory = {
	args: {
		source,
		readOnly: true,
	},
};

export const WithDetail: OrchestratorStory = {
	args: {
		source: sourceDetail,
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
