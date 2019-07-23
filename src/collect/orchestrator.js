import React from 'react';
import Orchestrator from '../orchestrator';
import simspons from './simpsons';

const CollectOrchestrator = () => (
	<Orchestrator
		savingType="COLLECTED"
		preferences={['COLLECTED']}
		source={simspons}
	/>
);

export default CollectOrchestrator;
