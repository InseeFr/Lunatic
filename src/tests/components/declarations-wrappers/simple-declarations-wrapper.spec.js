import React from 'react';
import { shallow } from 'enzyme';
import { SimpleDeclarationsWrapper } from 'components/declarations/wrappers';

describe('simple-declarations-wrapper', () => {
	it('renders without crashing', () => {
		shallow(
			<SimpleDeclarationsWrapper id="module-id" label="Sequence">
				<span>{`test`}</span>
			</SimpleDeclarationsWrapper>
		);
	});
	it('renders with elements', () => {
		const wrapper = shallow(
			<SimpleDeclarationsWrapper id="module-id" label="Sequence">
				<span>{`test`}</span>
			</SimpleDeclarationsWrapper>
		);
		expect(wrapper.children()).toHaveLength(4);
	});
});
