import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import source from './source.json';
import { generateData } from '../../../../tests/utils/lunatic';
import { times } from '../../../utils/array';

const stories = {
	title: 'Behaviour/Performance',
	component: Orchestrator,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});
Default.args = {
	id: 'performance-default',
	pagination: true,
	source,
	data: generateData({
		PRENOM: times(200, (k) => `John${k}`),
		NOM: times(200, (k) => `Doe${k}`),
		AGE: times(200, (k) => k + 1),
		BIRTHDAY: times(200, (k) => `2${k.toString().padStart(3, '0')}-01-01`),
	}),
};
