import React from 'react';
import { mount } from 'enzyme';
import Orchestrator from '../../../stories/utils/orchestrator';
import source from './loop';
import sourceStatic from './loop-static';

describe('Loop', () => {
	it('renders loop q without crashing', () => {
		mount(
			<Orchestrator
				source={source}
				data={{}}
				management={false}
				features={['VTL']}
				pagination
				initialPage="3.12#1"
			/>
		);
	});
	it('renders static loop q without crashing', () => {
		mount(
			<Orchestrator
				source={sourceStatic}
				data={{}}
				management={false}
				features={['VTL']}
			/>
		);
	});
});
