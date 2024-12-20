import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceLoop from './sourceLoop';
import sourceDetail from './sourceDetail';
import sourceCondition from './sourceCondition';
import defaultArgs from '../utils/default-args';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/CheckboxGroup',
	component: Orchestrator,
	args: {
		...defaultArgs,
		shortcut: true,
	},
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

Default.args = {
	...stories.args,
	source,
};

export const Condition = Template.bind({});

Condition.args = {
	...Default.args,
	source: sourceCondition,
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
	...Default.args,
	source,
	readOnly: true,
};

export const WithDetail = Template.bind({});
WithDetail.args = {
	...Default.args,
	source: sourceDetail,
	detailAlwaysDisplayed: false,
};

WithDetail.argTypes = {
	...Default.argTypes,
	detailAlwaysDisplayed: {
		control: 'boolean',
		defaultValue: false,
		description: 'Always display detail options',
		table: {
			disable: false,
			category: 'Components Options',
		},
	},
};

export const Loop = Template.bind({});

Loop.args = {
	...Default.args,
	source: sourceLoop,
};
