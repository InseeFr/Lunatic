import React from 'react';
import BlockForLoop from './block-for-loop';

function Loop(props) {
	const {
		declarations,
		label,
		lines,
		iterations,
		id,
		components,
		handleChange,
		value,
		management,
		executeExpression,
		loopDependencies,
		bindingDependencies,
	} = props;

	return (
		<BlockForLoop
			declarations={declarations}
			label={label}
			lines={lines}
			iterations={iterations}
			id={id}
			components={components}
			handleChange={handleChange}
			valueMap={value}
			management={management}
			executeExpression={executeExpression}
			loopDependencies={loopDependencies}
			bindingDependencies={bindingDependencies}
		/>
	);
}

export default Loop;
