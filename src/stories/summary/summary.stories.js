import { useState } from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';
import Summary from './summary';

const stories = {
	title: 'Components/Summary',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

function onChange({ name }, value) {
	console.log('onChange', name, value);
}

function Template(args) {
	const [displaySummuray, setDisplaySummary] = useState(false);

	return (
		<>
			<Summary source={source} display={displaySummuray} data={data} />
			<Orchestrator
				handleChange={onChange}
				display={!displaySummuray}
				{...args}
			/>
		</>
	);
}

export const Default = Template.bind({});
export default stories;
Default.args = { id: 'links', source, pagination: true, data };
