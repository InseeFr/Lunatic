import React from 'react';
import { shallow } from 'enzyme';
import { Textarea } from 'components';

const handleChange = jest.fn();
const defaultProps = { id: 'id', label: 'label', value: 'value', handleChange };

describe('textarea', () => {
	it('renders without crashing', () => {
		shallow(<Textarea {...defaultProps} />);
	});

	it('returns readOnly component', () => {
		const wrapper = shallow(<Textarea {...defaultProps} readOnly />);
		expect(wrapper.find('textarea').prop('readOnly')).toBeTruthy();
	});

	it('returns enabled component', () => {
		const wrapper = shallow(<Textarea {...defaultProps} />);
		expect(wrapper.find('textarea').prop('readOnly')).toBeFalsy();
	});

	it('returns required component', () => {
		const wrapper = shallow(<Textarea {...defaultProps} required />);
		expect(wrapper.find('textarea').prop('required')).toBeTruthy();
	});

	it('should trigger the change event', () => {
		const wrapper = shallow(<Textarea {...defaultProps} />);
		wrapper.find('textarea').simulate('change', {
			target: {
				value: 'value',
			},
		});
		expect(handleChange).toHaveBeenCalledWith('value');
	});
});
