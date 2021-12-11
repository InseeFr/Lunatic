import React from 'react';
import BlockforLoop from './block-for-loop';

function Loop(props) {
	const { declarations, label, lines, id, components, handleChange, value } =
		props;

	return (
		<BlockforLoop
			declarations={declarations}
			label={label}
			lines={lines}
			id={id}
			components={components}
			handleChange={handleChange}
			valueMap={value}
		/>
	);
}

export default Loop;
