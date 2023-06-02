import React from 'react';
import defaultArgTypes from '../../utils/default-arg-types';
import Orchestrator from '../../utils/orchestrator';
import data from './data';
import data2 from './data2';
import eapQuestionnaire from './source';
import eapQuestionnaire2 from './source2';

const stories = {
	title: 'Questionnaires/EAP',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});
export const Estanpette = Template.bind({});

async function getReferentiel(name) {
	switch (name) {
		case 'nomenclature-multiple':
			return fetch('prod-eap.json').then((r) => r.json());
		default:
			throw new Error(`Unknown referentiel ${name}`);
	}
}

Default.args = {
	id: 'eap-mvp',
	source: eapQuestionnaire,
	pagination: true,
	data,
};

Estanpette.args = {
	id: 'eap-estanpette',
	source: eapQuestionnaire2,
	pagination: true,
	data: data2,
	getReferentiel,
	autoSuggesterLoading: true,
};
