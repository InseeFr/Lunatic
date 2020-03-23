import React from 'react';
import { shallow } from 'enzyme';
import { Input } from 'components';

const handleChange = jest.fn();
const defaultProps = { id: 'id', label: 'label', handleChange };

describe('input', () => {
	it('renders without crashing', () => {
		shallow(<Input {...defaultProps} />);
	});
});
