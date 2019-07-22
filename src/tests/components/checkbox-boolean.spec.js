import React from 'react';
import { shallow } from 'enzyme';
import { CheckboxBoolean } from 'components';

describe('checkbox-boolean', () => {
	const onChange = jest.fn();

	it('renders without crashing', () => {
		shallow(<CheckboxBoolean id="id" label={''} handleChange={onChange} />);
	});

	it('test VERTICAL positioning', () => {
		shallow(
			<CheckboxBoolean
				id="id"
				label={'label'}
				handleChange={onChange}
				positioning="VERTICAL"
			/>
		);
	});
});
