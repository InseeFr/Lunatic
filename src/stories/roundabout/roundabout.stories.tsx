import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';
import sourceWithControl from './sourceWithControl.json';

import { Meta, StoryObj } from '@storybook/react';

import { dataFromObject } from '../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Roundabout',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
		data: dataFromObject({
			NB_HAB: 2,
			PRENOMS: ['Fanny', 'Ines'],
			AGE: [24, 22],
			PROGRESS: [-1, -1],
		}),
	},
};

export const OneIteration: Story = {
	args: {
		source,
		data: dataFromObject({
			NB_HAB: 1,
			PRENOMS: ['Fanny'],
			AGE: [15],
		}),
	},
};

export const WithControl: Story = {
	args: {
		source: sourceWithControl,
	},
};
