import { Orchestrator } from '../../utils/Orchestrator';
import source from './source.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Missing',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
		initialPage: '2',
		missing: true,
		shortcut: true,
	},
};

export const ReadOnly: Story = {
	args: {
		...Default.args,
		readOnly: true,
	},
};
