import React from 'react';
import { shallow, mount } from 'enzyme';
import { Radio } from 'components';

const handleChange = jest.fn();
const options = [
	{ value: 'france', label: 'France' },
	{ value: 'italy', label: 'Italy' },
];
const response = { valueState: [{ valueType: 'COLLECTED', value: 'italy' }] };
const defaultProps = {
	id: 'id',
	label: 'label',
	handleChange,
	options,
	response,
};

describe('radio', () => {
	it('renders without crashing', () => {
		mount(<Radio {...defaultProps} />);
	});

	it('returns tooltip and keyboardSelection component', () => {
		shallow(<Radio {...defaultProps} tooltip keyboardSelection />);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(<Radio {...defaultProps} />);
		wrapper.setProps({ focused: true });
	});

	it('should trigger the change event', () => {
		const wrapper = shallow(<Radio {...defaultProps} />);
		wrapper
			.find('input')
			.first()
			.simulate('change');
		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith({ '': 'france' });
	});
});
