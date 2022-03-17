import React from 'react';
import createCustomizableLunaticField from '../../create-customizable-field';

function Tbody({ id, children }) {
	return (
		<tbody id={`lunatic-table-tbody-${id}`} className="lunatic-table-tbody">
			{children}
		</tbody>
	);
}

export default createCustomizableLunaticField(Tbody);
