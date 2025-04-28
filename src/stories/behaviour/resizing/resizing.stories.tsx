import { Orchestrator } from '../../utils/Orchestrator';
import source from './source.json';
import sourceResizingCleaning from './source-resizing-cleaning.json';

import { Meta, StoryObj } from '@storybook/react';

import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Resizing',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const ResizingWithCleaning: Story = {
	args: {
		source: sourceResizingCleaning,
		data: dataFromObject({
			NBHAB: 2,
			NAME: ['Jean', 'Paul'],
		}),
	},
};
