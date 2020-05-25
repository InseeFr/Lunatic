import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckboxOne } from 'components';

const handleChange = jest.fn();
const options = [
	{ value: 'france', label: 'France' },
	{ value: 'italy', label: 'Italy' },
];
const response = { values: { COLLECTED: 'italy' } };

const defaultProps = {
	id: 'id',
	label: 'label',
	handleChange,
	options,
	response,
};

describe('checkbox-one', () => {
	it('renders without crashing', () => {
		mount(<CheckboxOne {...defaultProps} />);
	});

	it('returns tooltip component', () => {
		shallow(<CheckboxOne {...defaultProps} tooltip />);
	});

	it('returns disabled component', () => {
		shallow(<CheckboxOne {...defaultProps} label="label" disabled />);
	});
});
