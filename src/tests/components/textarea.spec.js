import React from 'react';
import { shallow } from 'enzyme';
import { Textarea } from 'components';

const handleChange = jest.fn();
const defaultProps = { id: 'id', label: 'label', handleChange };

describe('textarea', () => {
	it('renders without crashing', () => {
		shallow(<Textarea {...defaultProps} />);
	});
});
