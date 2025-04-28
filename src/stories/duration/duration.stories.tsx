import { Meta, StoryObj } from '@storybook/react';
import { Orchestrator } from '../utils/Orchestrator';
import sourceMonths from './sourceMonths.json';
import sourceTime from './sourceTime.json';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Duration',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const DateDuration: Story = {
	args: {
		source: sourceMonths,
	},
};

export const TimeDuration: Story = {
	args: {
		source: sourceTime,
	},
};
