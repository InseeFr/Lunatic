import React from 'react';
import { shallow, mount } from 'enzyme';
import { Radio } from 'components';

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

describe('radio', () => {
	it('renders without crashing', () => {
		mount(<Radio {...defaultProps} />);
	});

	it('returns management & disabled component', () => {
		shallow(<Radio {...defaultProps} management disabled />);
	});
});
