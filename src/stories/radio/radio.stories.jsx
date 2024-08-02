import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceHorizontal from './sourceHorizontal';
import sourceDetail from './sourceDetail';
import sourceCondition from './sourceCondition';
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
Default.args = { source, shortcut: true };

export const Condition = Template.bind({});
Condition.args = { source: sourceCondition };

export const Horizontal = Template.bind({});
Horizontal.args = { source: sourceHorizontal, shortcut: true };

export const ReadOnly = Template.bind({});
ReadOnly.args = { source, shortcut: true, readOnly: true };

export const Detail = Template.bind({});
Detail.args = { source: sourceDetail, shortcut: true };
