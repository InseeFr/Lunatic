import React from 'react';
import titleDecorator from 'utils/decorator/title-decorator';
import { shallow } from 'enzyme';

describe('string utils', () => {
	describe('titleDecorator', () => {
		it('renders without crashing', () => {
			const WrappedComponent = titleDecorator(() => <div>Component</div>);
			shallow(<WrappedComponent title="Component title" />);
		});
	});
});
