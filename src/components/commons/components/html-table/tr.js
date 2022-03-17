import React from 'react';
import createCustomizableLunaticField from '../../create-customizable-field';

function Tr({ id, children }) {
	return (
		<tr id={`lunatic-table-tr-${id}`} className="lunatic-table-tr">
			{children}
		</tr>
	);
}

export default createCustomizableLunaticField(Tr);
