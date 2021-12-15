import React from 'react';
import BlockForLoop from './block-for-loop';

function Loop(props) {
	const {
		declarations,
		label,
		lines,
		id,
		components,
		handleChange,
		value,
		management,
		executeExpression,
		loopDependencies,
	} = props;
	return (
		<BlockForLoop
			declarations={declarations}
			label={label}
			lines={lines}
			id={id}
			components={components}
			handleChange={handleChange}
			valueMap={value}
			management={management}
			executeExpression={executeExpression}
			loopDependencies={loopDependencies}
		/>
	);
}

export default Loop;
