import React from 'react';
import Orchestrator from '../orchestrator';
import simspons from './simpsons';
import data from '../data';

const CollectOrchestrator = () => (
	<Orchestrator
		savingType="COLLECTED"
		preferences={['COLLECTED']}
		source={simspons}
		data={data}
	/>
);

export default CollectOrchestrator;
