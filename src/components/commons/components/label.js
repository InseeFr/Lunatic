import React from 'react';
import createCustomizableLunaticField from '../create-customizable-field';
import Description from './description';

function Label({ children, id, htmlFor, className, style, description }) {
	if (children) {
		return (
			<label htmlFor={htmlFor} id={id} className={className} style={style}>
				{children}
				<Description value={description} />
			</label>
		);
	}
	return null;
}

export default createCustomizableLunaticField(Label, 'Label');
