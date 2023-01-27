import Orchestrator from '../utils/orchestrator';
import React from 'react';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';
import source from './sourceWithHierarchy';

const stories = {
	title: 'Components/Breadcrumb',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'breadcrumb', source, showBreadcrumb: true, data };
