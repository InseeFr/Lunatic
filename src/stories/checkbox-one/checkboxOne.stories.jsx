import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceWithDetail from './sourceDetail';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/CheckboxOne',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		shortcut: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { source, shortcut: false };

export const WithDetail = Template.bind({});
WithDetail.args = {
	source: sourceWithDetail,
	shortcut: false,
};
