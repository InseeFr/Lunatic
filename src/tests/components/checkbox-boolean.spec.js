import React from 'react';
import { shallow } from 'enzyme';
import { CheckboxBoolean } from 'components';

describe('checkbox-boolean', () => {
	const onChange = jest.fn();

	it('renders without crashing', () => {
		shallow(<CheckboxBoolean id="id" label={''} handleChange={onChange} />);
	});

	it('test state changes', () => {
		const wrapper = shallow(
			<CheckboxBoolean id="id" label="label" handleChange={onChange} />
		);
		expect(wrapper.state(['checked'])).toBeFalsy();
		wrapper.setState({ checked: true });
		expect(wrapper.state(['checked'])).toBeTruthy();
		wrapper.setState({ checked: false });
		expect(wrapper.state(['checked'])).toBeFalsy();
	});

	it('test init checked', () => {
		const wrapper = shallow(
			<CheckboxBoolean
				id="id"
				value={true}
				label={'label'}
				handleChange={onChange}
			/>
		);
		expect(wrapper.state(['checked'])).toBeTruthy();
	});

	it('test handler', () => {
		const wrapper = shallow(
			<CheckboxBoolean id="id" label="label" handleChange={onChange} />
		);
		// Select first checkbox
		wrapper.find('.checkbox-lunatic').simulate('change');
		expect(wrapper.state(['checked'])).toBeTruthy();
		// Change selected checkbox
		wrapper.find('.checkbox-lunatic').simulate('change');
		expect(wrapper.state(['checked'])).toBeFalsy();
	});

	it('test VERTICAL positioning', () => {
		shallow(
			<CheckboxBoolean
				id="id"
				label={'label'}
				handleChange={onChange}
				positioning="VERTICAL"
			/>
		);
	});
});
