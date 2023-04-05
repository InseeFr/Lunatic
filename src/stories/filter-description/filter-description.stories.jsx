import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceOptions from './source-options';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/FilterDescription',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		filterDescription: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'filter-description', source };

export const Options = Template.bind({});

Options.args = {
	id: 'filter-description-options',
	source: sourceOptions,
	filterDescription: true,
};
