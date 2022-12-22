import React from 'react';
import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceEuros from './source-euros';
import sourcePattern from './source-pattern';
import sourceThousand from './source-thansand';

const stories = {
	title: 'Components/InputNumber',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'input-number', source, min: 0, max: 10, decimals: 0 };

export const UnitEuros = Template.bind({});

UnitEuros.args = { id: 'input-number-euro', source: sourceEuros, unit: '€' };

export const ThousandSeparator = Template.bind({});

ThousandSeparator.args = {
	id: 'input-number-thousand',
	source: sourceThousand,
	min: 0,
	max: 1000000,
	decimals: 0,
	thousandSeparator: ' ',
};
