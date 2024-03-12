import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import simple from './simple';
import sourceComponentSet from './source-component-set';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Suggester',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

const getReferentiel = async (name) => {
	try {
	 return fetch(`./${name}.json`).then((r) => r.json());
	} catch (error) {
	 throw new Error(`Unknown référentiel ${name}`);
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

export const ComponentSet = Template.bind({});
ComponentSet.args = {
	source: sourceComponentSet,
	getReferentiel,
	autoSuggesterLoading: true,
};
