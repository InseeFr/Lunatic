import React from 'react';
import { shallow, mount } from 'enzyme';
import { InputDeclarationsWrapper } from 'components/declarations/wrappers';

const handleChange = jest.fn();
const defaultProps = {
	id: 'id',
	label: 'label',
	handleChange,
	type: 'text',
	roleType: 'input',
};

describe('input-declarations-wrapper', () => {
	it('renders without crashing', () => {
		shallow(<InputDeclarationsWrapper {...defaultProps} />);
		shallow(
			<InputDeclarationsWrapper
				{...defaultProps}
				type={null}
				roleType="textarea"
			/>
		);
	});
	it('returns readOnly and autoComplete component', () => {
		const wrapper = shallow(
			<InputDeclarationsWrapper {...defaultProps} readOnly autoComplete />
		);
		expect(wrapper.find('input').prop('readOnly')).toBeTruthy();
	});

	it('returns enabled component', () => {
		const wrapper = shallow(<InputDeclarationsWrapper {...defaultProps} />);
		expect(wrapper.find('input').prop('readOnly')).toBeFalsy();
	});

	it('returns mandatory component', () => {
		const wrapper = shallow(
			<InputDeclarationsWrapper {...defaultProps} mandatory />
		);
		expect(wrapper.find('input').prop('required')).toBeTruthy();
	});

	it('returns management component', () => {
		shallow(<InputDeclarationsWrapper {...defaultProps} management />);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(<InputDeclarationsWrapper {...defaultProps} />);
		wrapper.setProps({ focused: true });
	});

	// TODO: find a way to test with onBlur under the hood

	// it('should trigger the change event', () => {
	// 	const wrapper = shallow(<InputDeclarationsWrapper {...defaultProps} />);
	// 	wrapper.find('input').simulate('change', {
	// 		target: {
	// 			value: 'new value',
	// 		},
	// 	});
	// 	expect(handleChange).toHaveBeenCalled();
	// 	expect(handleChange).toHaveBeenCalledWith({ '': 'new value' });
	// });
});
