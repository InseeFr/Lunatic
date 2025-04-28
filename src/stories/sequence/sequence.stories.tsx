import { Orchestrator } from '../utils/Orchestrator';
import sourceDeclarations from './source-declarations.json';
import source from './source.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Sequence',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const WithDeclarations: Story = {
	args: {
		source: sourceDeclarations,
	},
};
