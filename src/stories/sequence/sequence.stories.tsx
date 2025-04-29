import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import sourceDeclarations from './source-declarations.json';
import source from './source.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Sequence',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const WithDeclarations: OrchestratorStory = {
	args: {
		source: sourceDeclarations,
	},
};
