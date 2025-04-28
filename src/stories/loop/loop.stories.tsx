import { Orchestrator } from '../utils/Orchestrator';
import sourceBloc from './source-bloc.json';
import sourcePaginated from './source-paginated.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Loop',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source: sourceBloc,
	},
};

export const Paginated: Story = {
	args: {
		source: sourcePaginated,
	},
};

export const ReadOnly: Story = {
	args: {
		source: sourceBloc,
		readOnly: true,
	},
};
