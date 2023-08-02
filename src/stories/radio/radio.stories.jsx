import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceBoolean from './source-boolean';
import defaultArgTypes from '../utils/default-arg-types';
import data from './data';

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

export const BooleanRadio = Template.bind({});

BooleanRadio.args = { id: 'radio', source: sourceBoolean, data };
