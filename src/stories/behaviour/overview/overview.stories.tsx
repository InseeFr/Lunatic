import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import source from './source.json';
import sourceLoop from './sourceLoop.json';

import { Meta } from '@storybook/react';

import { dataFromObject } from '../../../utils/object';

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/Overview',
	...OrchestratorMeta,
	args: {
		...OrchestratorMeta.args,
		showOverview: true,
	},
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
			ETAT: '1',
			SATISFAIT: '1',
			T_NHAB: 3,
			T_PRENOM: ['Quentin', 'Luna', 'Paul'],
			COMMCOMPO: 'super',
			T_SEXE: ['1', '2', '1'],
			T_DATENAIS: [null, null, null],
			REMARQUES: [null, 'a', 'b'],
			SUPERQUEST: ['ok', 'ok', null],
			AUTRESUPERQUEST: ['a', 'c', 'ras'],
			ENCOREUNEQ: ['wow', 'b', null],
			COMMENT_QE: null,
			ETAT_MISSING: null,
			SATISFAIT_MISSING: null,
			T_NHAB_MISSING: null,
			T_PRENOM_MISSING: null,
			COMMCOMPO_MISSING: null,
			T_SEXE_MISSING: null,
			T_DATENAIS_MISSING: [null, 'DK', 'RF'],
			REMARQUES_MISSING: [null, null, null],
			SUPERQUEST_MISSING: [null, null, 'DK'],
			ENCOREUNEQ_MISSING: [null, null, 'RF'],
			AUTRESUPERQUEST_MISSING: null,
			COMMENT_QE_MISSING: null,
		}),
		lastReachedPage: '11.2#2',
	},
};
