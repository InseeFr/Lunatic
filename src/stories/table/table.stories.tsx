import type { Meta, StoryObj } from '@storybook/react';
import { Orchestrator } from '../utils/Orchestrator';
import source from './source.json';
import sourceColspan from './source-colspan.json';
import sourceDynamic from './source-dynamic.json';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Table',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create data equivalent to data.json but using dataFromObject
export const Default: Story = {
	args: {
		source,
	},
};

export const Colspan: Story = {
	args: {
		source: sourceColspan,
	},
};

export const DynamicTable: Story = {
	args: {
		source: sourceDynamic,
	},
};
