import React from 'react';

function Th({ id, index, children }) {
	return (
		<th id={`lunatic-table-th-${id}-${index}`} className="lunatic-table-th">
			{children}
		</th>
	);
}

export default Th;
