import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';
import sourceBigNumber from './source-big-number.json';
import sourceEuro from './source-euro.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/InputNumber',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const DynamicUnit: Story = {
	args: {
		source: sourceEuro,
	},
};

export const BigNumber: Story = {
	args: {
		source: sourceBigNumber,
	},
};
