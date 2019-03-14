import React from 'react';
import { shallow } from 'enzyme';
import { Input } from 'components';

const handleChange = jest.fn();
const defaultProps = { id: 'id', label: 'label', value: 'value', handleChange };

describe('input', () => {
	it('renders without crashing', () => {
		shallow(<Input {...defaultProps} />);
	});

	it('returns readOnly component', () => {
		const wrapper = shallow(<Input {...defaultProps} readOnly />);
		expect(wrapper.find('input').prop('readOnly')).toBeTruthy();
	});

	it('returns enabled component', () => {
		const wrapper = shallow(<Input {...defaultProps} />);
		expect(wrapper.find('input').prop('readOnly')).toBeFalsy();
	});

	it('returns required component', () => {
		const wrapper = shallow(<Input {...defaultProps} required />);
		expect(wrapper.find('input').prop('required')).toBeTruthy();
	});

	it('should trigger the change event', () => {
		const wrapper = shallow(<Input {...defaultProps} />);
		wrapper.find('input').simulate('change', {
			target: {
				value: 'value',
			},
		});
		expect(handleChange).toHaveBeenCalledWith('value');
	});
});
