import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import simple from './source-simple.json';
import simpleNum from './source-simple-numeric.json';
import sourceLoop from './source-loop.json';
import sourceRoundabout from './source-roundabout.json';
import boucleNTabDynamique from './source-boucles-n.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Controls',
	...OrchestratorMeta,
};

export default meta;

export const BoucleN: OrchestratorStory = {
	args: {
		source: boucleNTabDynamique,
	},
};

export const Simple: OrchestratorStory = {
	args: {
		source: simple,
	},
};

export const SimpleNum: OrchestratorStory = {
	args: {
		source: simpleNum,
	},
};

export const LinkedLoop: OrchestratorStory = {};

export const Loop: OrchestratorStory = {
	args: {
		source: sourceLoop,
	},
};

export const Roundabout: OrchestratorStory = {
	args: {
		source: sourceRoundabout,
	},
};
