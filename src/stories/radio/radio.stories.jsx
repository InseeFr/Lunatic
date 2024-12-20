import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceHorizontal from './sourceHorizontal';
import sourceDetail from './sourceDetail';
import sourceCondition from './sourceCondition';
import defaultArgs from '../utils/default-args';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Radio',
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

export const Horizontal = Template.bind({});

Horizontal.args = {
	...Default.args,
	source: sourceHorizontal,
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
	...Default.args,
	source,
	readOnly: true,
};

export const WithDetail = Template.bind({});

WithDetail.args = {
	...Default.argTypes,
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
