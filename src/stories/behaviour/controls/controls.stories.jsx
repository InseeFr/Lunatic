import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import simple from './simple.json';
import simpleNum from './simple-numeric.json';
import linkedLoop from './loop.json';
import linkedLoop2 from './V2_Controles_BouclesLiees2_PasPageFin.json';
import defaultArgTypes from '../../utils/default-arg-types';
import boucleNTabDynamique from './boucles-n.json';

const stories = {
	title: 'Behaviour/Controls',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		missing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		activeGoNextForMissing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		management: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: false,
		},
		activeControls: {
			control: 'boolean',
			defaultValue: true,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const BoucleN = Template.bind({});

BoucleN.args = {
	id: 'boucle-dylan',
	pagination: true,
	activeControls: true,
	source: boucleNTabDynamique,
};

export const Simple = Template.bind({});

Simple.args = {
	id: 'controls-simple',
	source: simple,
	pagination: true,
};

export const SimpleNum = Template.bind({});

SimpleNum.args = {
	id: 'controls-simple-num',
	source: simpleNum,
	pagination: true,
	activeControls: true,
};

export const LinkedLoop = Template.bind({});

LinkedLoop.args = {
	id: 'controls-linked-loop',
	source: linkedLoop,
	pagination: true,
	activeControls: true,
};

export const LinkedLoop2 = Template.bind({});

LinkedLoop2.args = {
	id: 'controls-linked-loop2',
	source: linkedLoop2,
	pagination: true,
	activeControls: true,
};
