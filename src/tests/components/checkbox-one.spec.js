import React from 'react';
import { mount } from 'enzyme';
import { CheckboxOne } from 'components';

describe('checkbox-one', () => {
	const onChange = jest.fn();
	const options = [
		{ value: 'france', label: 'France' },
		{ value: 'italy', label: 'Italy' },
	];

	it('renders without crashing', () => {
		mount(<CheckboxOne id={''} handleChange={onChange} options={options} />);
	});
});
