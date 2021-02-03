import React from 'react';
import { shallow, mount } from 'enzyme';
import { fakeSchedulers } from 'rxjs-marbles/jest';
import { ListDeclarationsWrapper } from 'components/declarations/wrappers';

const handleChange = jest.fn();
const options = [
	{ value: 'france', label: 'France' },
	{ value: 'italy', label: 'Italy' },
];
const response = { values: { COLLECTED: 'italy' } };

const defaultProps = {
	id: 'id',
	label: 'label',
	handleChange,
	options,
	response,
};

describe('list-declarations-wrapper', () => {
	it('renders without crashing', () => {
		mount(<ListDeclarationsWrapper {...defaultProps} type="radio" />);
		mount(<ListDeclarationsWrapper {...defaultProps} type="checkbox" />);
	});

	it('returns management component', () => {
		shallow(
			<ListDeclarationsWrapper {...defaultProps} management type="radio" />
		);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(
			<ListDeclarationsWrapper {...defaultProps} type="radio" />
		);
		wrapper.setProps({ focused: true });
	});

	it('should trigger the change event', () => {
		fakeSchedulers((advance) => {
			const wrapper = shallow(
				<ListDeclarationsWrapper {...defaultProps} type="radio" />
			);
			wrapper.find('input').first().simulate('change');
			advance(400);
			wrapper.update();
			expect(handleChange).toHaveBeenCalled();
			expect(handleChange).toHaveBeenCalledWith({ '': 'france' });
		});
	});
});
