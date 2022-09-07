import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import defaultArgTypes from '../utils/default-arg-types';
import sourceEuros from './source-euros';
const stories = {
	title: 'Components/InputNumber',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'input-number', source };

export const UnitEuros = Template.bind({});

UnitEuros.args = { id: 'input-number-euro', source: sourceEuros };
