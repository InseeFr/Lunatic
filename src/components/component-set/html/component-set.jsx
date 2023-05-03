import React from 'react';
import { createCustomizableLunaticField, Errors } from '../../commons';
import Legend from './legend';

function ComponentSet({ id, errors, description, legendText, children }) {
	const labelId = `label-${id}`;
	return (
		<fieldset className="lunatic-component-set">
			<Legend id={labelId} description={description}>
				{legendText}
			</Legend>
			{children}
			<Errors errors={errors} activeId={id} />
		</fieldset>
	);
}

export default createCustomizableLunaticField(ComponentSet, 'ComponentSet');
