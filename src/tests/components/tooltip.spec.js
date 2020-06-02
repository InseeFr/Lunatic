import React from 'react';
import { shallow, mount } from 'enzyme';
import { TooltipResponse } from 'components';

const response = {
	name: 'Response',
	values: {
		PREVIOUS: null,
		COLLECTED: '1',
		FORCED: '0',
		EDITED: '1',
		INPUTED: null,
	},
};

describe('tooltip', () => {
	it('renders without crashing', () => {
		shallow(<TooltipResponse id="id" />);
		shallow(<TooltipResponse id="id" response={response} />);
	});
	it('renders firing useEffect', () => {
		const wrapper = mount(<TooltipResponse id="id" response={response} />);
		wrapper.setProps({ response: {} });
	});
});
