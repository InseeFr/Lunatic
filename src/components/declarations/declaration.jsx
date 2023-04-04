import React from 'react';
import classnames from 'classnames';
import createCustomizableLunaticField from '../commons/create-customizable-field';

function Declaration({ children, type }) {
	return (
		<div
			data-testid="declaration"
			className={classnames(
				'declaration-lunatic',
				`declaration-${type.toLowerCase()}`
			)}
		>
			{children}
		</div>
	);
}
export default createCustomizableLunaticField(Declaration, 'Declaration');
