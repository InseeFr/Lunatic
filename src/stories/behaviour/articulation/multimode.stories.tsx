import source from './roundabout.json';

import { Meta, StoryObj } from '@storybook/react';
import { Orchestrator } from '../../utils/Orchestrator';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Articulation/MultiMode',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
		multiMode: true,
	},
};
