import React from 'react';

function THead({ id, children }) {
	return (
		<thead id={`lunatic-table-thead-${id}`} className="lunatic-table-thead">
			{children}
		</thead>
	);
}

export default THead;
