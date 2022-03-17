import React from 'react';
import createCustomizableLunaticField from '../../create-customizable-field';

function Thead({ id, children }) {
	return (
		<thead id={`lunatic-table-thead-${id}`} className="lunatic-table-thead">
			{children}
		</thead>
	);
}

export default createCustomizableLunaticField(Thead);
