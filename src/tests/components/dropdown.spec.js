import React from 'react';
import { shallow } from 'enzyme';
import { Dropdown } from 'components';

const handleChange = jest.fn();
const defaultProps = {
	id: 'id',
	label: 'label',
	handleChange,
	options: [
		{ value: 'france', label: 'France' },
		{ value: 'italy', label: 'Italy' },
	],
};

describe('dropdown', () => {
	it('renders without crashing', () => {
		shallow(<Dropdown {...defaultProps} />);
	});
});
