import React from 'react';
import { shallow } from 'enzyme';
import { Breadcrumb } from 'components';

describe('breadcrumb', () => {
	it('renders without crashing', () => {
		shallow(<Breadcrumb elements={[]} />);
	});
	it('renders with elements', () => {
		const wrapper = shallow(<Breadcrumb elements={['One', 'Two']} />);
		expect(wrapper.find('.breadcrumb-lunatic').children()).toHaveLength(2);
	});
});
