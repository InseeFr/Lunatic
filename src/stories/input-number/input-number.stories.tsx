import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceBigNumber from './source-big-number.json';
import sourceEuro from './source-euro.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/InputNumber',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const DynamicUnit: OrchestratorStory = {
	args: {
		source: sourceEuro,
	},
};

export const BigNumber: OrchestratorStory = {
	args: {
		source: sourceBigNumber,
	},
};
