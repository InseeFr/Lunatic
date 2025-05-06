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

export const CheckboxBoolean: OrchestratorStory = {
	args: {
		source,
	},
};

export const CheckboxGroup: OrchestratorStory = {
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

export const CheckboxGroupReadOnly: OrchestratorStory = {
	args: {
		readOnly: true,
		source: sourceGroup,
		shortcut: true,
	},
};

export const CheckboxGroupWithDetail: OrchestratorStory = {
	args: {
		source: sourceGroupDetail,
		shortcut: true,
	},
};

export const CheckboxGroupInLoop: OrchestratorStory = {
	args: {
		source: sourceGroupLoop,
		shortcut: true,
	},
};

export const CheckboxOne: OrchestratorStory = {
	args: {
		source: sourceOne,
	},
};

export const CheckboxOneWithDetail: OrchestratorStory = {
	args: {
		source: sourceOneDetail,
	},
};
