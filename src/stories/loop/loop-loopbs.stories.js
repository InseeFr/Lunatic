import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceBloc from './source-loop-loopbs.json';
import defaultArgTypes from '../utils/default-arg-types';
import { generateData } from '../../../tests/helpers';

const stories = {
	title: 'Components/Loop/LoopLoopbs',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = {
	id: 'loop-loopbs',
	source: sourceBloc,
	data: generateData({
		PRENOM: ['John', 'Jane', 'Toto'],
		HOUSEHOLD: ['menA', 'menB'],
	}),
};

export const Filled = Template.bind({});
Filled.args = {
	id: 'loop-loopbs-filled',
	source: sourceBloc,
};
