import Orchestrator from '../utils/orchestrator';
import source from './source2';
import data from './data2';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/ComponentSet',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const InRoundabout = Template.bind({});

InRoundabout.args = { id: 'component-set', source, pagination: true, data };
