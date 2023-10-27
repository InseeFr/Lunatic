import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import testDylan from './test-dylan.json';
import minMaxLoops from './V2_MinMaxSum_Boucles.json';
import simpleLoops from './V2_QuestSimple_Boucles.json';
import rallyGames from './V2_TCMRallyeGames.json';
import declarationsSimples from './V2_DeclarationsSimples.json';
import defaultArgTypes from '../../utils/default-arg-types';

const stories = {
	title: 'Behaviour/Others',
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
export const TestDylan = Template.bind({});

TestDylan.args = {
	id: 'test-dylan',
	pagination: true,
	source: testDylan,
};

export const DeclarationsSimples = Template.bind({});

DeclarationsSimples.args = {
	id: 'declarations-simples',
	pagination: true,
	source: declarationsSimples,
};

export const MinMaxLoops = Template.bind({});

MinMaxLoops.args = {
	id: 'min-max-loops',
	pagination: true,
	source: minMaxLoops,
};

export const SimpleLoops = Template.bind({});

SimpleLoops.args = {
	id: 'simple-loops',
	pagination: true,
	source: simpleLoops,
};

export const RallyeGames = Template.bind({});

RallyeGames.args = {
	id: 'rally-games',
	pagination: true,
	source: rallyGames,
};
