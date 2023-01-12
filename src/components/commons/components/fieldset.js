import React from 'react';
import createCustomizableLunaticField from '../../commons/create-customizable-field';
import safetyLabel from '../safety-label';
import Description from './description';
import './fieldset.scss';

function Fieldset({ children, legend, description }) {
	return (
		<fieldset>
			<legend>
				{safetyLabel(legend)}
				<Description value={description} />
			</legend>
			{children}
		</fieldset>
	);
}

export default createCustomizableLunaticField(Fieldset, 'Fieldset');
