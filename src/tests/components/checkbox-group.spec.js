import React from 'react';
import { mount } from 'enzyme';
import { CheckboxGroup } from 'components';

describe('checkbox-group', () => {
	const onChange = jest.fn();
	const responses = [
		{ id: '1', value: false, label: 'France' },
		{ id: '2', value: false, label: 'Italy' },
	];

	it('renders without crashing', () => {
		mount(
			<CheckboxGroup id={''} handleChange={onChange} responses={responses} />
		);
	});
});
