import React from 'react';
import { shallow, mount } from 'enzyme';
import { fakeSchedulers } from 'rxjs-marbles/jest';
import { CheckboxBoolean } from 'components';

describe('checkbox-boolean', () => {
	const handleChange = jest.fn();
	const defaultProps = { id: 'id', label: '', handleChange };

	it('renders without crashing', () => {
		shallow(<CheckboxBoolean {...defaultProps} />);
	});

	it('returns management component', () => {
		shallow(<CheckboxBoolean {...defaultProps} label="label" management />);
	});

	it('returns disabled component', () => {
		shallow(<CheckboxBoolean {...defaultProps} label="label" disabled />);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(<CheckboxBoolean {...defaultProps} />);
		wrapper.setProps({ focused: true });
	});

	it('test VERTICAL positioning', () => {
		shallow(<CheckboxBoolean {...defaultProps} positioning="VERTICAL" />);
	});

	it('should trigger the change event', () => {
		fakeSchedulers((advance) => {
			const wrapper = shallow(<CheckboxBoolean {...defaultProps} />);
			wrapper.find('input').simulate('change', {
				target: {
					checked: true,
				},
			});
			advance(400);
			wrapper.update();
			expect(handleChange).toHaveBeenCalled();
			expect(handleChange).toHaveBeenCalledWith({ '': true });
		});
	});
});
