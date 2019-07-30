import React from 'react';
import { shallow, mount } from 'enzyme';
import { InputNumber } from 'components';

const defaultProps = { id: 'id', label: 'label' };

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

	it('returns readOnly and autoComplete component', () => {
		const wrapper = shallow(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				max={100}
				readOnly
				autoComplete
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
				readOnly
			/>
		);
		expect(wrapper.find('input').prop('readOnly')).toBe(true);
	});

	it('returns tooltip component', () => {
		shallow(
			<InputNumber {...defaultProps} handleChange={handleChange} tooltip />
		);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(
			<InputNumber {...defaultProps} handleChange={handleChange} />
		);
		wrapper.setProps({ focused: true });
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
		const wrapperMin = shallow(
			<InputNumber {...defaultProps} handleChange={handleChange} min={0} />
		);
		wrapperMin.find('input').simulate('change', {
			target: {
				value: '-10',
			},
		});
		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith({ '': '-10' });
		const wrapperMax = shallow(
			<InputNumber {...defaultProps} handleChange={handleChange} max={100} />
		);
		wrapperMax.find('input').simulate('change', {
			target: {
				value: '1000',
			},
		});
		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith({ '': '1000' });
		const wrapperMinMax = shallow(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={5}
				max={100}
			/>
		);
		wrapperMinMax.find('input').simulate('change', {
			target: {
				value: '10',
			},
		});
		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith({ '': '10' });
	});
});
