import React from 'react';
import { shallow } from 'enzyme';
import { Subsequence } from 'components';

describe('subsequence', () => {
	it('renders without crashing', () => {
		shallow(<Subsequence id="subsequence-id" label="Subsequence" />);
	});
});
