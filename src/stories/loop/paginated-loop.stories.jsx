import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source-paginated.json';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Loop/PaginatedLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = { id: 'paginated-loop', source };
