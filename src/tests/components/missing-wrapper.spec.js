import React from 'react';
import { mount } from 'enzyme';
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

const defaultPropsWithMissing = {
	...defaultProps,
	missingResponse: { name: 'z', values: { COLLECTED: null } },
};

describe('missing-wrapper', () => {
	it('renders without crashing', () => {
		mount(<Radio {...defaultProps} />);
	});
	it('renders with missing without crashing', () => {
		mount(<Radio {...defaultPropsWithMissing} />);
	});
});
