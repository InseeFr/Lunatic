import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import defaultArgTypes from '../utils/default-arg-types';
import * as custom from '../custom-mui';

const stories = {
	title: 'Components/Switch',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} custom={custom} />;
export const Default = Template.bind({});

Default.args = { id: 'switch', source };
