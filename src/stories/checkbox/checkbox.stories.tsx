import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';
import sourceGroup from './sourceGroup.json';
import sourceGroupCondition from './sourceGroupCondition.json';
import sourceGroupDetail from './sourceGroupDetail.json';
import sourceGroupLoop from './sourceGroupLoop.json';
import sourceOne from './sourceOne.json';
import sourceOneDetail from './sourceOneDetail.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Checkbox',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Boolean: Story = {
	args: {
		source,
	},
};

export const Group: Story = {
	args: {
		source: sourceGroup,
		shortcut: true,
	},
};

export const GroupWithCondition: Story = {
	args: {
		source: sourceGroupCondition,
		shortcut: true,
	},
};

export const GroupReadOnly: Story = {
	args: {
		readOnly: true,
		source: sourceGroup,
		shortcut: true,
	},
};

export const GroupWithDetail: Story = {
	args: {
		source: sourceGroupDetail,
		shortcut: true,
	},
};

export const GroupInLoop: Story = {
	args: {
		source: sourceGroupLoop,
		shortcut: true,
	},
};

export const One: Story = {
	args: {
		source: sourceOne,
	},
};

export const OneWithDetail: Story = {
	args: {
		source: sourceOneDetail,
	},
};
