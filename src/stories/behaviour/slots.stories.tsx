import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from '../input/source.json';

import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Slots',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
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
