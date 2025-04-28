import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';

import { Meta, StoryObj } from '@storybook/react';

import { dataFromObject } from '../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Pairwise',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
		data: dataFromObject({
			PRENOM: ['Dad', 'Mom', 'Unknow'],
			AGE: [30, 29, 5],
			LINKS: [[null]],
			OTHER: [[null]],
		}),
		initialPage: '3',
	},
};
