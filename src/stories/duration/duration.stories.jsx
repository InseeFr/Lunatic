import React from 'react';
import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import moisSource from './mois';
import timeSource from './time';

const stories = {
	title: 'Components/Duration',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const DateDuration = Template.bind({});

DateDuration.args = { id: 'durationAnnéesMois', source: moisSource };

export const TimeDuration = Template.bind({});

TimeDuration.args = {
	id: 'durationHeureMinute',
	source: timeSource,
};
