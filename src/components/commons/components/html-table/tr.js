import React from 'react';

function Tr({ id, children }) {
	return (
		<tr id={`lunatic-table-tr-${id}`} className="lunatic-table-tr">
			{children}
		</tr>
	);
}

export default Tr;
