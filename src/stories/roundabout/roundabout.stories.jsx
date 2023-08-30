import Orchestrator from '../utils/orchestrator';
import source from './source';
import data1 from './data1';
import data2 from './data2';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Roundabout',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'roundabout',
	source,
	pagination: true,
	data: data2,
};

export const OneIteration = Template.bind({});

OneIteration.args = {
	id: 'roundabout-one-iteration',
	source,
	pagination: true,
	data: data1,
};
