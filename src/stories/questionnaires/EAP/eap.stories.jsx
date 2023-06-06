import React from 'react';
import defaultArgTypes from '../../utils/default-arg-types';
import Orchestrator from '../../utils/orchestrator';
import dataEAP from './data-eap';
import sourceEAP from './source-eap';

const stories = {
	title: 'Questionnaires/EAP',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Estanpette = Template.bind({});

async function getReferentiel(name) {
	switch (name) {
		case 'nomenclature-eap':
			return fetch('prod-eap.json').then((r) => r.json());
		default:
			throw new Error(`Unknown referentiel ${name}`);
	}
}

Estanpette.args = {
	id: 'eap-estanpette',
	source: sourceEAP,
	pagination: true,
	data: dataEAP,
	getReferentiel,
	autoSuggesterLoading: true,
};
