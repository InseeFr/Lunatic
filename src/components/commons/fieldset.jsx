import React from 'react';
import classnames from 'classnames';
import createCustomizableLunaticField from '../create-customizable-field';
import safetyLabel from '../safety-label';
import Description from './description';
import './fieldset.scss';

function Fieldset({ children, legend, description, className }) {
	return (
		<fieldset className={classnames(className)}>
			<legend>
				{safetyLabel(legend)}
				<Description value={description} />
			</legend>
			{children}
		</fieldset>
	);
}

export default createCustomizableLunaticField(Fieldset, 'Fieldset');
