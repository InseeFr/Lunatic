import React from 'react';
import Orchestrator from '../orchestrator';
import simspons from './simpsons';

const ManagementOrchestrator = () => (
	<Orchestrator
		savingType="EDITED"
		preferences={['COLLECTED', 'FORCED', 'EDITED']}
		source={simspons}
		tooltip={true}
	/>
);

export default ManagementOrchestrator;
