import React from 'react';
import createCustomizableLunaticField from '../../create-customizable-field';

function Table({ id, children }) {
	return (
		<table id={`table-${id}`} className="lunatic-table">
			{children}
		</table>
	);
}

export default createCustomizableLunaticField(Table);
