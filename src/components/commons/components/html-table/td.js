import React from 'react';

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

export default Td;
