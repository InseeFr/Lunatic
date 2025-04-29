import {
	Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceHorizontal from './sourceHorizontal.json';
import sourceDetail from './sourceDetail.json';
import sourceCondition from './sourceCondition.json';

import { Meta } from '@storybook/react';

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
