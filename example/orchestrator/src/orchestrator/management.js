import React from 'react';
import Orchestrator from './orchestrator';
import simpsons from './simpsons';
import data from './data';

const Management = () => (
	<Orchestrator
		savingType={'EDITED'}
		preferences={['COLLECTED', 'FORCED', 'EDITED']}
		source={simpsons}
		data={data}
		tooltip={true}
	/>
);

export default Management;
