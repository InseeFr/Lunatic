import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'components';

describe('button', () => {
	const onClick = jest.fn();

	it('renders without crashing', () => {
		shallow(<Button value="Button" onClick={onClick} />);
	});
});
