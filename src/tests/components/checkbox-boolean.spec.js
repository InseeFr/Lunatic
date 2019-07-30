import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckboxBoolean } from 'components';

describe('checkbox-boolean', () => {
	const handleChange = jest.fn();
	const defaultProps = { id: 'id', label: '', handleChange };

	it('renders without crashing', () => {
		shallow(<CheckboxBoolean {...defaultProps} />);
	});

	it('returns tooltip component', () => {
		shallow(<CheckboxBoolean {...defaultProps} label="label" tooltip />);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(<CheckboxBoolean {...defaultProps} />);
		wrapper.setProps({ focused: true });
	});

	it('test VERTICAL positioning', () => {
		shallow(<CheckboxBoolean {...defaultProps} positioning="VERTICAL" />);
	});

	it('should trigger the change event', () => {
		const wrapper = shallow(<CheckboxBoolean {...defaultProps} />);
		wrapper.find('input').simulate('change', {
			target: {
				checked: true,
			},
		});
		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith({ '': true });
	});
});
