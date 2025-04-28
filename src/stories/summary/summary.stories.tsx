import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';

import { Meta, StoryObj } from '@storybook/react';

import { dataFromObject } from '../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Summary',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
		initialPage: '5',
		data: dataFromObject({
			NB_HAB: 2,
			PRENOMS: ['Matt', 'Julia'],
			PROGRESS: [-1, -1],
			AGE: [26, 31],
			SEXE: ['1', '2'],
		}),
	},
};
