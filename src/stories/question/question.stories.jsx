import Orchestrator from '../utils/orchestrator';
import source from './source.json';

import defaultArgTypes from '../utils/default-arg-types';
//import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Components/Question',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
	},
};
// } satisfies Meta<typeof Orchestrator>;

export default meta;

//type Story = StoryObj<typeof Orchestrator>

export const Default = { args: { id: 'sequence-simple', source } };
// satisfies Story
