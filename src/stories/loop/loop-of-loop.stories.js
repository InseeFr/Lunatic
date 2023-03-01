import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceBloc from './source-loop-loop.json';
import defaultArgTypes from '../utils/default-arg-types';
import { generateData } from '../../../test/helpers';

const stories = {
	title: 'Components/Loop/LoopOfLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = {
	id: 'loop-of-loop',
	source: sourceBloc,
	data: generateData({
		PRENOM: ['John', 'Jane'],
		AGE: [29, 32],
		PRENOM_CHILDREN: [
			['John Junior 1', 'John Junior 2'],
			['Jane Junior 1', 'Jane Junior 2'],
		],
		AGE_CHILDREN: [
			[13, 10],
			[9, 8],
		],
	}),
};
