import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';
import sourceHorizontal from './sourceHorizontal.json';
import sourceDetail from './sourceDetail.json';
import sourceCondition from './sourceCondition.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Radio',
	component: Orchestrator,
	args: {
		shortcut: true,
	},
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const Condition: Story = {
	args: {
		source: sourceCondition,
	},
};

export const Horizontal: Story = {
	args: {
		source: sourceHorizontal,
	},
};

export const ReadOnly: Story = {
	args: {
		source,
		readOnly: true,
	},
};

export const WithDetail: Story = {
	args: {
		source: sourceDetail,
	},
};
