import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';

import { Meta, StoryObj } from '@storybook/react';

import { dataFromObject } from '../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Dropdown',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
		data: dataFromObject({
			STATE: '2',
			STATE2: '3',
		}),
	},
};
