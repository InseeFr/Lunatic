import React from 'react';
import BlockforLoop from './block-for-loop';

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
	} = props;
	// console.log(executeExpression);
	return (
		<BlockforLoop
			declarations={declarations}
			label={label}
			lines={lines}
			id={id}
			components={components}
			handleChange={handleChange}
			valueMap={value}
			management={management}
		/>
	);
}

export default Loop;
