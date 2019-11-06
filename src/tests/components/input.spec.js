import React from 'react';
import { shallow, mount } from 'enzyme';
import { Input } from 'components';

const handleChange = jest.fn();
const defaultProps = { id: 'id', label: 'label', handleChange };

describe('input', () => {
	it('renders without crashing', () => {
		shallow(<Input {...defaultProps} />);
	});

	it('returns readOnly and autoComplete component', () => {
		const wrapper = shallow(<Input {...defaultProps} readOnly autoComplete />);
		expect(wrapper.find('input').prop('readOnly')).toBeTruthy();
	});

	it('returns enabled component', () => {
		const wrapper = shallow(<Input {...defaultProps} />);
		expect(wrapper.find('input').prop('readOnly')).toBeFalsy();
	});

	it('returns mandatory component', () => {
		const wrapper = shallow(<Input {...defaultProps} mandatory />);
		expect(wrapper.find('input').prop('mandatory')).toBeTruthy();
	});

	it('returns tooltip component', () => {
		shallow(<Input {...defaultProps} tooltip />);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(<Input {...defaultProps} />);
		wrapper.setProps({ focused: true });
	});

	it('should trigger the change event', () => {
		const wrapper = shallow(<Input {...defaultProps} />);
		wrapper.find('input').simulate('change', {
			target: {
				value: 'new value',
			},
		});
		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith({ '': 'new value' });
	});
});
