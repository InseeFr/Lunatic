import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceDetail from './sourceDetail';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Radio',
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
Default.args = { id: 'radio', source, shortcut: true };

export const ReadOnly = Template.bind({});
ReadOnly.args = { source, shortcut: true, readOnly: true };

export const Detail = Template.bind({});
Detail.args = { source: sourceDetail, shortcut: true };
