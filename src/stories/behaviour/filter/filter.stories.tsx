import { Orchestrator } from '../../utils/Orchestrator';
import source from './source.json';
import sourceLoop from './sourceLoop.json';

import { Meta, StoryObj } from '@storybook/react';

import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Filter',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const WithLoop: Story = {
	args: {
		source: sourceLoop,
		data: dataFromObject({
			NBHAB: 2,
			NAME: ['Jean', 'Paul'],
		}),
	},
};
