import { Meta } from '@storybook/react';
import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import sourceMonths from './sourceMonths.json';
import sourceTime from './sourceTime.json';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Duration',
	...OrchestratorMeta,
};

export default meta;

export const DateDuration: OrchestratorStory = {
	args: {
		source: sourceMonths,
	},
};

export const TimeDuration: OrchestratorStory = {
	args: {
		source: sourceTime,
	},
};
