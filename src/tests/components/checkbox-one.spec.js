import React from 'react';
import { mount } from 'enzyme';
import { CheckboxOne } from 'components';

const handleChange = jest.fn();
const options = [
	{ value: 'france', label: 'France' },
	{ value: 'italy', label: 'Italy' },
];

const defaultProps = { id: 'id', label: 'label', handleChange, options };

describe('checkbox-one', () => {
	it('renders without crashing', () => {
		mount(<CheckboxOne {...defaultProps} />);
	});
});
