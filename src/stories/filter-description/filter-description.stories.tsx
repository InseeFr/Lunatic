import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceOptions from './sourceOptions.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/FilterDescription',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const Options: OrchestratorStory = {
	args: {
		source: sourceOptions,
	},
};
