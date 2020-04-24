import React from 'react';
import { shallow } from 'enzyme';
import { Textarea } from 'components';

const handleChange = jest.fn();
const defaultProps = { id: 'id', label: 'label', handleChange };

describe('textarea', () => {
	it('renders without crashing', () => {
		shallow(<Textarea {...defaultProps} />);
	});
	it('returns tooltip component', () => {
		shallow(<Textarea {...defaultProps} label="label" tooltip />);
	});
	it('returns disabled & readOnly component', () => {
		shallow(<Textarea {...defaultProps} label="label" disabled readOnly />);
	});
});
