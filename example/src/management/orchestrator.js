import React from 'react';
import Orchestrator from '../orchestrator';
import simspons from './simpsons';
import data from '../data';

const ManagementOrchestrator = () => (
	<Orchestrator
		savingType="EDITED"
		preferences={['COLLECTED', 'FORCED', 'EDITED']}
		source={simspons}
		data={data}
		tooltip={true}
	/>
);

export default ManagementOrchestrator;
