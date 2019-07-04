import React from 'react';
import { mount } from 'enzyme';
import { Checkbox } from 'components';

describe('checkbox', () => {
	const onChange = jest.fn();
	const options = [
		{ id: '1', value: false, label: 'France' },
		{ id: '2', value: false, label: 'Italy' },
	];

	it('renders without crashing', () => {
		mount(<Checkbox id={''} handleChange={onChange} options={options} />);
	});
});
