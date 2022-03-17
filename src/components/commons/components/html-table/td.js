import React from 'react';
import createCustomizableLunaticField from '../../create-customizable-field';

function Td({ id, children, row, index }) {
	return (
		<td
			id={`lunatic-table-td-${id}-${row}-${index}`}
			className="lunatic-table-td"
		>
			{children}
		</td>
	);
}

export default createCustomizableLunaticField(Td);
