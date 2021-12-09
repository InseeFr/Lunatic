import React from 'react';

function Fieldset({ children, legend }) {
	return (
		<fieldset>
			<legend>{legend}</legend>
			{children}
		</fieldset>
	);
}

export default Fieldset;
