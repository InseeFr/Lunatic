import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceWithDetail from './sourceDetail';
import defaultArgs from '../utils/default-args';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/CheckboxOne',
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

export const WithDetail = Template.bind({});
WithDetail.args = {
	...Default.args,
	source: sourceWithDetail,
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
