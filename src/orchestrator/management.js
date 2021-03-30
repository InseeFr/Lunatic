import React from 'react';
import Orchestrator from './orchestrator';
import data from './data';

const Management = ({ source, pagination, paginationType }) => (
	<Orchestrator
		savingType={'EDITED'}
		preferences={['COLLECTED', 'FORCED', 'EDITED']}
		source={source}
		features={['VTL']}
		data={data}
		management
		filterDescription
		writable
	/>
);

export default Management;
