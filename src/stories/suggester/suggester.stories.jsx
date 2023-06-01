import React from 'react';
import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import multipleResponses from './multipleResponses';
import simple from './simple';
import source from './source';

const stories = {
	title: 'Components/Suggester',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

async function getReferentiel(name) {
	switch (name) {
		case 'naf-rev2-stop':
		case 'naf-rev2':
			return fetch(
				'https://inseefr.github.io/Lunatic/storybook/naf-rev2.json'
			).then((r) => r.json());
		case 'cog-communes':
			return fetch(
				'https://inseefr.github.io/Lunatic/storybook/communes-2019.json'
			).then((r) => r.json());
		case 'nomenclature-multiple':
			return fetch('/nomenclature-multiple.json').then((r) => r.json());
		default:
			throw new Error(`Unkonw référentiel ${name}`);
	}
}

Default.args = {
	id: 'suggester',
	source,
	autoSuggesterLoading: true,
	getReferentiel,
	pagination: true,
};

export const Simple = Template.bind({});
Simple.args = {
	source: simple,
	getReferentiel,
	autoSuggesterLoading: true,
	missing: {
		table: { disable: false },
		control: 'boolean',
		defaultValue: true,
	},
};

export const MultipleResponses = Template.bind({});
MultipleResponses.args = {
	id: 'suggester-multiple',
	source: multipleResponses,
	getReferentiel,
	autoSuggesterLoading: true,
};
