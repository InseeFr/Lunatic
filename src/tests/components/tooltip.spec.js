import React from 'react';
import { shallow, mount } from 'enzyme';
import { TooltipResponse } from 'components';

const response = {
	name: 'Response',
	valueState: [
		{ valueType: 'PREVIOUS', value: null },
		{ valueType: 'COLLECTED', value: '1' },
		{ valueType: 'FORCED', value: '0' },
		{ valueType: 'EDITED', value: '1' },
		{ valueType: 'INPUTED', value: null },
	],
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
