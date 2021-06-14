import React from 'react';
import { shallow } from 'enzyme';
import { RosterForLoop } from 'components';

describe('RosterForLoop', () => {
	const handleChange = jest.fn();
	const defaultProps = { id: 'id', label: '', handleChange };
	it('renders without crashing', () => {
		shallow(<RosterForLoop {...defaultProps} />);
	});
});
