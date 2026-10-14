import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';

import { Meta } from '@storybook/react';
import type { LunaticData } from '../../../use-lunatic/type';

const externalData = (CADRE: string): LunaticData => ({
	EXTERNAL: { CADRE },
	COLLECTED: {},
	CALCULATED: {},
});

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/ActiveFilters',
	...OrchestratorMeta,
};

export default meta;

export const All: OrchestratorStory = {
	args: {
		source,
		activeFilters: 'ALL',
		data: externalData('NON'),
	},
};

export const External: OrchestratorStory = {
	args: {
		source,
		activeFilters: 'EXTERNAL',
		data: externalData('OUI'),
	},
};

export const ExternalCadreNON: OrchestratorStory = {
	args: {
		source,
		activeFilters: 'EXTERNAL',
		data: externalData('NON'),
	},
};

export const None: OrchestratorStory = {
	args: {
		source,
		activeFilters: 'NONE',
		data: externalData('NON'),
	},
};

export const OldDisableFilter: OrchestratorStory = {
	args: {
		source,
		disableFilters: true,
		data: externalData('NON'),
	},
};