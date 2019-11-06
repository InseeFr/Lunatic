import React from 'react';
import Orchestrator from './orchestrator';
import simpsons from './simpsons';
import data from './data';

const Collect = () => {
	const { COLLECTED, ...dataForCollect } = data;
	return (
		<Orchestrator
			savingType={'COLLECTED'}
			preferences={['COLLECTED']}
			source={simpsons}
			data={dataForCollect}
			tooltip={false}
		/>
	);
};

export default Collect;
