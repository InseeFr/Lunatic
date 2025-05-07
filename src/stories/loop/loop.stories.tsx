import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import sourceBloc from './source-bloc.json';
import sourcePaginated from './source-paginated.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Loop',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source: sourceBloc,
	},
};

export const Paginated: OrchestratorStory = {
	args: {
		source: sourcePaginated,
	},
};

export const ReadOnly: OrchestratorStory = {
	args: {
		source: sourceBloc,
		readOnly: true,
	},
};
