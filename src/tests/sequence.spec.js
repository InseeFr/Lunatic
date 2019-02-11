import React from 'react';
import { shallow } from 'enzyme';
import { Sequence } from 'components';

describe('sequence', () => {
	it('renders without crashing', () => {
		shallow(<Sequence id="module-id" label="Sequence" />);
	});
});
