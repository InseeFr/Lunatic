import React from 'react';
import { shallow } from 'enzyme';
import { ProgressBar } from 'components';

describe('progress-bar', () => {
	it('renders without crashing', () => {
		shallow(<ProgressBar id="progress-bar-id" value={50} />);
	});
	it('renders without crashing with negative value', () => {
		shallow(<ProgressBar id="progress-bar-id" value={-10} />);
	});
	it('renders without crashing with upper than 100 value', () => {
		shallow(<ProgressBar id="progress-bar-id" value={1000} />);
	});
});
