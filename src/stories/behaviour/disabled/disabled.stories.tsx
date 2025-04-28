import { Orchestrator } from '../../utils/Orchestrator';
import source from './source.json';

import { Meta, StoryObj } from '@storybook/react';

import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Disabled',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
		data: dataFromObject({
			NOM: 'Renaud',
			DISABLED_NOM: true,
			SEXE: '2',
			DISABLED_SEXE: true,
		}),
	},
};
