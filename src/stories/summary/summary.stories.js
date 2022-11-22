import Orchestrator from '../utils/orchestrator';
import source from './source';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Summary',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

function onChange({ name }, value) {
	console.log('onChange', name, value);
}

function Template(args) {
	return (
		<>
			<Orchestrator summary={true} handleChange={onChange} {...args} />
		</>
	);
}

export const Default = Template.bind({});
export default stories;
Default.args = { id: 'links', source, pagination: true, data };
