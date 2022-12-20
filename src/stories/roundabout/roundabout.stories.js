import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';

function RoundaboutItTitleDSFR({ label }) {
	return (
		<>
			<div>Titre custom</div>
			<div className="roundabout-it-title">{label}</div>
		</>
	);
}

const custom = {
	RoundaboutItTitle: RoundaboutItTitleDSFR,
};

const stories = {
	title: 'Components/Roundabout',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} custom={custom} />;
export const Default = Template.bind({});

Default.args = { id: 'roundabout', source, pagination: true, data };
