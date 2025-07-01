import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import simple from './source-simple.json';
import simpleNum from './source-simple-numeric.json';
import sourceRosterForLoop from './source-roster-for-loop.json';
import sourceStandaloneLoop from './source-standalone-loop.json';
import dataStandaloneLoop from './data-standalone-loop.json';
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

export const RosterForLoop: OrchestratorStory = {
	args: {
		source: sourceRosterForLoop,
	},
};

export const StandaloneLoop: OrchestratorStory = {
	args: {
		source: sourceStandaloneLoop,
		data: dataStandaloneLoop.data,
	},
};

export const Roundabout: OrchestratorStory = {
	args: {
		source: sourceRoundabout,
	},
};
