import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceGroup from './sourceGroup.json';
import sourceGroupCondition from './sourceGroupCondition.json';
import sourceGroupDetail from './sourceGroupDetail.json';
import sourceGroupLoop from './sourceGroupLoop.json';
import sourceOne from './sourceOne.json';
import sourceOneDetail from './sourceOneDetail.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Checkbox',
	...OrchestratorMeta,
};

export default meta;

export const Boolean: OrchestratorStory = {
	args: {
		source,
	},
};

export const Group: OrchestratorStory = {
	args: {
		source: sourceGroup,
		shortcut: true,
	},
};

export const GroupWithCondition: OrchestratorStory = {
	args: {
		source: sourceGroupCondition,
		shortcut: true,
	},
};

export const GroupReadOnly: OrchestratorStory = {
	args: {
		readOnly: true,
		source: sourceGroup,
		shortcut: true,
	},
};

export const GroupWithDetail: OrchestratorStory = {
	args: {
		source: sourceGroupDetail,
		shortcut: true,
	},
};

export const GroupInLoop: OrchestratorStory = {
	args: {
		source: sourceGroupLoop,
		shortcut: true,
	},
};

export const One: OrchestratorStory = {
	args: {
		source: sourceOne,
	},
};

export const OneWithDetail: OrchestratorStory = {
	args: {
		source: sourceOneDetail,
	},
};
