import React from 'react';
import { shallow } from 'enzyme';
import { Dropdown } from 'components';

describe('dropdown', () => {
	const onChange = jest.fn();

	it('renders without crashing', () => {
		shallow(<Dropdown id={''} handleChange={onChange} />);
	});

	//TODO
});
