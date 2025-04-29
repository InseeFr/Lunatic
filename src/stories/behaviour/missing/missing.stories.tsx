import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Missing',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
		initialPage: '2',
		missing: true,
		shortcut: true,
	},
};

export const ReadOnly: OrchestratorStory = {
	args: {
		...Default.args,
		readOnly: true,
	},
};
