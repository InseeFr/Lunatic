import { Orchestrator } from '../../utils/Orchestrator';
import simple from './source-simple.json';
import simpleNum from './source-simple-numeric.json';
import sourceLoop from './source-loop.json';
import sourceRoundabout from './source-roundabout.json';
import boucleNTabDynamique from './source-boucles-n.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Controls',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const BoucleN: Story = {
	args: {
		source: boucleNTabDynamique,
	},
};

export const Simple: Story = {
	args: {
		source: simple,
	},
};

export const SimpleNum: Story = {
	args: {
		source: simpleNum,
	},
};

export const LinkedLoop: Story = {};

export const Loop: Story = {
	args: {
		source: sourceLoop,
	},
};

export const Roundabout: Story = {
	args: {
		source: sourceRoundabout,
	},
};
