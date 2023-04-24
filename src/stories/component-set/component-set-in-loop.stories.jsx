import Orchestrator from '../utils/orchestrator';
import source from './source1';
import data from './data1';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/ComponentSet',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const InLoop = Template.bind({});

InLoop.args = { id: 'component-set', source, pagination: true, data };
