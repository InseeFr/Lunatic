import React from 'react';
import createCustomizableLunaticField from '../create-customizable-field';

function Label({ children, id, htmlFor, className }) {
	if (children) {
		return (
			<label htmlFor={htmlFor} id={id} className={className}>
				{children}
			</label>
		);
	}
	return null;
}

export default createCustomizableLunaticField(Label);
