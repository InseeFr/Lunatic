import React from 'react';
import Orchestrator from './orchestrator';
import data from './data';

const Collect = ({ source, pagination, paginationType }) => {
	const { COLLECTED, ...dataForCollect } = data;
	return (
		<Orchestrator
			savingType={'COLLECTED'}
			preferences={['COLLECTED']}
			features={['VTL']}
			source={source}
			data={dataForCollect}
			tooltip={false}
			pagination={pagination}
			paginationType={paginationType}
			writable
		/>
	);
};

export default Collect;
