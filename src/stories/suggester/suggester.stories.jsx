import React from 'react';
import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import { getReferentiel } from '../utils/referentiel';
import source from './source';
import sourceOptionResponses from './source-option-responses';
import sourceArbitraryResponse from './source-arbitrary-response.json';
import sourceError from './source-error.json';

const stories = {
	title: 'Components/Suggester',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

const getFakeReferentiel = async (name) => {
	try {
		return (await import(`./fakeReferentiel.json`)).default;
	} catch (error) {
		console.log('error', error);
		throw new Error(`Unknown référentiel ${name}`);
	}
};

Default.args = {
	id: 'suggester',
	source,
	autoSuggesterLoading: true,
	getReferentiel,
	pagination: true,
};
export const OptionResponses = Template.bind({});
OptionResponses.args = {
	id: 'suggester-with-option',
	source: sourceOptionResponses,
	getReferentiel: getFakeReferentiel,
	autoSuggesterLoading: true,
	pagination: true,
};

export const ArbitraryResponse = Template.bind({});
ArbitraryResponse.args = {
	id: 'suggester-with-option',
	source: sourceArbitraryResponse,
	getReferentiel: getFakeReferentiel,
	autoSuggesterLoading: true,
	pagination: true,
};

export const WithError = Template.bind({});
WithError.args = {
	id: 'suggester-error',
	source: sourceError,
	getReferentiel: getFakeReferentiel,
	autoSuggesterLoading: true,
	pagination: true,
};
