import React from 'react';
import { shallow } from 'enzyme';
import { Input } from 'components';

const handleChange = jest.fn();
const defaultProps = { id: 'id', label: 'label', handleChange };

describe('input', () => {
	it('renders without crashing', () => {
		shallow(<Input {...defaultProps} />);
	});
	it('returns management component', () => {
		shallow(<Input {...defaultProps} label="label" management />);
	});
	it('returns disabled & readOnly component', () => {
		shallow(<Input {...defaultProps} label="label" disabled readOnly />);
	});
});
