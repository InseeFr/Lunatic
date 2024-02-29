import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from '../input/source';
import data from '../input/data';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Behaviour/Custom',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

/**
 * @var
 */
const CustomInput = ({ onChange, value, label }) => (
	<fieldset>
		<legend style={{ color: 'gray', fontSize: '1rem' }}>{label}</legend>
		<input
			style={{ border: 'solid 3px gray', padding: '.5rem 1rem' }}
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	</fieldset>
);

Default.args = { id: 'input', source, data, custom: { Input: CustomInput } };
