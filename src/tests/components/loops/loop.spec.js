import React from 'react';
import { shallow } from 'enzyme';
import { Loop } from 'components';

describe('Loop', () => {
	const handleChange = jest.fn();
	const defaultProps = { id: 'id', label: '', handleChange };
	it('renders without crashing', () => {
		shallow(<Loop {...defaultProps} />);
	});
});
