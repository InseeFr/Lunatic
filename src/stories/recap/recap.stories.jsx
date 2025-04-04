import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source.json';
import defaultArgTypes from '../utils/default-arg-types';
import { objectToData } from '../utils/data';

const stories = {
	title: 'Components/Recap',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});
Default.args = {
	id: 'recap',
	source: source,
	data: objectToData({
		PRENOM: ['Maman', 'Papa', 'Fils'],
		AGE: [22, 25, 12],
		LINKS: [
			[null, '1', '3'],
			['1', null, '3'],
			['2', '2'],
		],
	}),
	pagination: true,
	initialPage: '4',
};
