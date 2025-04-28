import { Orchestrator } from '../../utils/Orchestrator';
import source from './source.json';
import data from './data.json';
import sourceSum from './source-sum.json';
import sourceSequence from './source-sequence.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Questionnaires/Logement',
	component: Orchestrator,
	args: {
		data,
		source,
	},
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {};
export const Sum: Story = { args: { source: sourceSum } };
export const Sequence: Story = { args: { source: sourceSequence } };
