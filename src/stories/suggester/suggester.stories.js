import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import simple from './simple';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Suggester',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

const suggesterFetcher = (url) =>
	fetch(url, {
		headers: { Accept: 'application/json' },
	});

Default.args = {
	id: 'suggester',
	source,
	autoSuggesterLoading: true,
	suggesters: {
		'naf-rev2': {
			url: 'https://inseefr.github.io/Lunatic/storybook/naf-rev2.json',
		},
		'naf-rev2-stop': {
			url: 'https://inseefr.github.io/Lunatic/storybook/naf-rev2.json',
			stopWords: [],
		},
		'cog-communes': {
			url: 'https://inseefr.github.io/Lunatic/storybook/communes-2019.json',
		},
	},
	suggesterFetcher,
	pagination: true,
};

async function getReferentiel(name) {
	switch (name) {
		case 'naf-rev2':
			return fetch(
				'https://inseefr.github.io/Lunatic/storybook/naf-rev2.json'
			).then((r) => r.json());
		case 'cog-communes':
			return fetch(
				'https://inseefr.github.io/Lunatic/storybook/communes-2019.json'
			).then((r) => r.json());
		default:
			throw new Error(`Unkonw référentiel ${name}`);
	}
}

export const Simple = Template.bind({});
Simple.args = {
	source: simple,
	getReferentiel,
	autoSuggesterLoading: true,
};
