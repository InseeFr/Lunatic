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
	it('returns management component', () => {
		shallow(<Datepicker {...defaultProps} label="label" management />);
	});
	it('returns disabled & readOnly component', () => {
		shallow(<Datepicker {...defaultProps} label="label" disabled readOnly />);
	});
});
