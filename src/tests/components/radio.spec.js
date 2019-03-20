import React from 'react';
import { shallow } from 'enzyme';
import { Radio } from 'components';

describe('radio', () => {
	const onChange = jest.fn();
	const options = [
		{ value: 'france', label: 'France' },
		{ value: 'italy', label: 'Italy' },
	];

	it('renders without crashing', () => {
		shallow(
			<Radio
				id="id"
				label={''}
				handleChange={onChange}
				options={options}
				positioning="VERTICAL"
			/>
		);
	});

	it('test state changes', () => {
		const wrapper = shallow(
			<Radio
				id="id"
				label="label"
				handleChange={onChange}
				options={options}
				positioning="VERTICAL"
			/>
		);
		expect(wrapper.state(['selectedValue'])).toBe('');
		wrapper.setState({ selectedValue: 'france' });
		expect(wrapper.state(['selectedValue'])).toBe('france');
		wrapper.setState({ selectedValue: 'italy' });
		expect(wrapper.state(['selectedValue'])).toBe('italy');
	});

	it('test handler', () => {
		const wrapper = shallow(
			<Radio
				id="id"
				label="label"
				handleChange={onChange}
				options={options}
				positioning="VERTICAL"
			/>
		);
		// Select first radio
		wrapper
			.find('.radio-lunatic')
			.first()
			.simulate('change');
		expect(wrapper.state(['selectedValue'])).toBe('france');
		// Change selected radio
		wrapper
			.find('.radio-lunatic')
			.at(1)
			.simulate('change');
		expect(wrapper.state(['selectedValue'])).toBe('italy');
	});
});
