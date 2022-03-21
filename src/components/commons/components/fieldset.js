import React from 'react';
import createCustomizableLunaticField from '../../commons/create-customizable-field';

function Fieldset({ children, legend }) {
	return (
		<fieldset>
			<legend>{legend}</legend>
			{children}
		</fieldset>
	);
}

export default createCustomizableLunaticField(Fieldset);
