import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';

function MonInput(props) {
	return <div>mon input</div>;
}

const stories = {
	title: 'Components/Input',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => (
	<Orchestrator {...args} custom={{ Input: MonInput }} />
);
export const Default = Template.bind({});

Default.args = { id: 'input', source, data };
