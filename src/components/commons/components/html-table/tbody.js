import React from 'react';

function TBody({ id, children }) {
	return (
		<tbody id={`lunatic-table-tbody-${id}`} className="lunatic-table-tbody">
			{children}
		</tbody>
	);
}

export default TBody;
