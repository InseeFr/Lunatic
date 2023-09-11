import Orchestrator from '../utils/orchestrator';
import source from './source';
import data from './data';
import sourceLoop from './source1';
import dataLoop from './data1';
import sourceRoundabout from './source2';
import dataRoundabout from './data2';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/ComponentSet',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'component-set',
	source,
	pagination: true,
	data,
	readOnly: false,
};

export const InRoundabout = Template.bind({});

InRoundabout.args = {
	id: 'component-set-roundabout',
	source: sourceRoundabout,
	pagination: true,
	data: dataRoundabout,
};

export const InLoop = Template.bind({});

InLoop.args = {
	id: 'component-set-loop',
	source: sourceLoop,
	pagination: true,
	data: dataLoop,
};
