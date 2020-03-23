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
});
