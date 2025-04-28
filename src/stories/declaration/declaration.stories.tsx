import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';
import sourceMarkdown from './sourceMarkdown.json';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Declaration',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const Markdown: Story = {
	args: {
		source: sourceMarkdown,
	},
};
