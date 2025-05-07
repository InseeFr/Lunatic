import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceOptionResponses from './source-option-responses.json';
import sourceArbitraryResponse from './source-arbitrary-response.json';
import sourceError from './source-error.json';
import sourceMultiline from './source-multiline.json';
import { getReferentiel } from '../utils/referentiel';
import { Meta } from '@storybook/react';
import { IndexEntry } from '../../utils/search/SearchInterface';

const getFakeReferentiel = async (name: string): Promise<IndexEntry[]> => {
	try {
		return (await import(`./fakeReferentiel.json`)).default;
	} catch (error) {
		console.log('error', error);
		throw new Error(`Unknown référentiel ${name}`);
	}
};

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Suggester',
	...OrchestratorMeta,
	args: {
		...OrchestratorMeta.args,
		autoSuggesterLoading: true,
		getReferentiel,
	},
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const OptionResponses: OrchestratorStory = {
	args: {
		source: sourceOptionResponses,
		getReferentiel: getFakeReferentiel,
	},
};

export const ArbitraryResponse: OrchestratorStory = {
	args: {
		...OptionResponses.args,
		source: sourceArbitraryResponse,
	},
};

export const WithError: OrchestratorStory = {
	args: {
		...OptionResponses.args,
		source: sourceError,
	},
};

export const MultiLine: OrchestratorStory = {
	args: {
		source: sourceMultiline,
		initialPage: '2',
	},
};
