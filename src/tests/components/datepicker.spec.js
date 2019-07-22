import React from 'react';
import { shallow } from 'enzyme';
import { Datepicker } from 'components';

const handleChange = jest.fn();
const defaultProps = {
	id: 'id',
	label: 'label',
	handleChange,
};

describe('datepicker', () => {
	it('renders without crashing', () => {
		shallow(<Datepicker {...defaultProps} />);
	});

	it('returns readOnly component', () => {
		const wrapper = shallow(<Datepicker {...defaultProps} readOnly />);
		expect(wrapper.find('input').prop('readOnly')).toBeTruthy();
	});

	it('returns enabled component', () => {
		const wrapper = shallow(<Datepicker {...defaultProps} />);
		expect(wrapper.find('input').prop('readOnly')).toBeFalsy();
	});

	it('returns required component', () => {
		const wrapper = shallow(<Datepicker {...defaultProps} required />);
		expect(wrapper.find('input').prop('required')).toBeTruthy();
	});

	it('should trigger the change event', () => {
		const wrapper = shallow(<Datepicker {...defaultProps} />);
		wrapper.find('input').simulate('change', {
			target: {
				value: 'new value',
			},
		});
		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith({ '': 'new value' });
	});
});
