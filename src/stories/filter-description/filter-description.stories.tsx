import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';
import sourceOptions from './sourceOptions.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/FilterDescription',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const Options: Story = {
	args: {
		source: sourceOptions,
	},
};
