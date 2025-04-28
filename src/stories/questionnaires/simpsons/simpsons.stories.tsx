import { Orchestrator } from '../../utils/Orchestrator';
import source from './source.json';
import { Meta, StoryObj } from '@storybook/react';
import { Logger } from '../../../utils/logger';

const meta: Meta<typeof Orchestrator> = {
	title: 'Questionnaires/Simpsons',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const WithMissing: Story = {
	args: {
		source,
		missing: true,
		missingStrategy: () => {
			Logger.info('your strategy has been applied');
		},
		dontKnowButton: 'I dunno',
		refusedButton: 'Oh no!',
	},
};
