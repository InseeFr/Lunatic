import React from 'react';
import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import { getReferentiel } from '../utils/referentiel';
import simple from './simple';
import source from './source';
import sourceComponentSet from './source-component-set';

const stories = {
	title: 'Components/Suggester',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

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
