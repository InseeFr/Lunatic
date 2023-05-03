import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import simple from './simple';
import defaultArgTypes from '../utils/default-arg-types';
import { SuggesterNotification } from './SuggesterNotification';

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
