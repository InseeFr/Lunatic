import React from 'react';
import { mount } from 'enzyme';
import Orchestrator from '../../../stories/utils/orchestrator';
import source from './roster-loop';

describe('RosterForLoop', () => {
	it('renders without crashing', () => {
		mount(
			<Orchestrator
				source={source}
				data={{}}
				management={false}
				pagination
				features={['VTL']}
			/>
		);
	});
});
