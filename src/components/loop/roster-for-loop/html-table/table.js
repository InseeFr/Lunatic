import React from 'react';

function Table({ id, children }) {
	return (
		<table id={`table-${id}`} className="lunatic-table">
			{children}
		</table>
	);
}

export default Table;
