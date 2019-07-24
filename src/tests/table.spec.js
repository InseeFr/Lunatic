import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'components';

describe('table', () => {
	const handleChange = jest.fn();

	it('renders without crashing', () => {
		mount(<Table id={'table-id'} handleChange={handleChange} />);
	});
});
