import { Orchestrator } from '../utils/Orchestrator';
import source from '../input/source.json';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Slots',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
		slots: {
			Input: ({ onChange, value, label }) => (
				<label className="floating-label">
					<input
						placeholder="Nom de l'occupant"
						className="input"
						value={value ?? ''}
						onChange={(e) => onChange(e.currentTarget.value)}
					/>
					<span>{label}</span>
				</label>
			),
		},
	},
};
