import { Orchestrator } from '../../utils/Orchestrator';
import source from './source.json';
import sourceLoop from './source-loop.json';
import sourceLoopScopes from './source-loop-scopes.json';

import { Meta, StoryObj } from '@storybook/react';

import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Cleaning',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const Loop: Story = {
	args: {
		source: sourceLoop,
	},
};

export const LoopWithMixedScopes: Story = {
	args: {
		source: sourceLoopScopes,
		data: dataFromObject({
			PRENOM: ['Laurent', 'Alain', 'toto'],
		}),
	},
};
