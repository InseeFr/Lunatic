import React from 'react';
import { mount } from 'enzyme';
import { Radio } from 'components';

const handleChange = jest.fn();
const defaultProps = {
	id: 'id',
	label: 'label',
	handleChange,
	options: [
		{ value: 'france', label: 'France' },
		{ value: 'italy', label: 'Italy' },
	],
	positioning: 'VERTICAL',
};

describe('radio', () => {
	it('renders without crashing', () => {
		mount(<Radio {...defaultProps} />);
	});
});
