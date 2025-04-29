import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceColspan from './source-colspan.json';
import sourceDynamic from './source-dynamic.json';
import { Meta } from '@storybook/react/*';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Table',
	...OrchestratorMeta,
};

export default meta;

// Create data equivalent to data.json but using dataFromObject
export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const Colspan: OrchestratorStory = {
	args: {
		source: sourceColspan,
	},
};

export const DynamicTable: OrchestratorStory = {
	args: {
		source: sourceDynamic,
	},
};
