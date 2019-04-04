import React from 'react';
import { shallow } from 'enzyme';
import { InputNumber } from 'components';

const defaultProps = { id: 'id', label: 'label', value: '10' };

describe('input-number', () => {
	const handleChange = jest.fn();

	it('minimalist renders without crashing', () => {
		shallow(<InputNumber {...defaultProps} handleChange={handleChange} />);
	});

	it('renders without crashing', () => {
		shallow(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={0}
				max={100}
				required={true}
				unit="euros"
				validators={[({ value }) => (value ? undefined : 'Value is required')]}
			/>
		);
	});

	it('returns readOnly component', () => {
		const wrapper = shallow(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={0}
				max={100}
				readOnly
			/>
		);
		expect(wrapper.find('input').prop('readOnly')).toBe(true);
	});

	it('returns readOnly component', () => {
		const wrapper = shallow(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={0}
				max={100}
				readOnly
			/>
		);
		expect(wrapper.find('input').prop('readOnly')).toBe(true);
	});

	it('returns enabled component', () => {
		const wrapper = shallow(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={0}
				max={100}
				required={true}
				decimals={1}
			/>
		);
		expect(wrapper.find('input').prop('readOnly')).toBe(false);
	});

	it('should trigger the change event', () => {
		const wrapper = shallow(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={0}
				max={100}
			/>
		);
		wrapper.find('input').simulate('change', {
			target: {
				value: 10,
			},
		});
		expect(handleChange).toHaveBeenCalledWith(10);
	});
	it('should active warning class', () => {
		const wrapper = shallow(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={0}
				max={100}
			/>
		);
		wrapper.setState({ messagesError: ['error'] });
	});
});
