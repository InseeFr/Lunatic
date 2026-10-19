import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';
import sourceLoop from './sourceLoop.json';
import sourceActiveFilters from './sourceActiveFilters.json';

import { Meta } from '@storybook/react';

import { dataFromObject } from '../../../utils/object';
import type { LunaticData } from '../../../use-lunatic/type';

const externalData = (CADRE: string): LunaticData => ({
	EXTERNAL: { CADRE },
	COLLECTED: {},
	CALCULATED: {},
});

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Filter',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const WithLoop: OrchestratorStory = {
	args: {
		source: sourceLoop,
		data: dataFromObject({
			NBHAB: 2,
			NAME: ['Jean', 'Paul'],
		}),
	},
};

export const ExternalFilters: OrchestratorStory = {
	args: {
		source: sourceActiveFilters,
		activeFilters: 'EXTERNAL',
		data: externalData('NON'),
	},
};

export const NoFilters: OrchestratorStory = {
	args: {
		source: sourceActiveFilters,
		activeFilters: 'NONE',
		data: externalData('NON'),
	},
};