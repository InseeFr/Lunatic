import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../commons';

type Props = PropsWithChildren<{ type: string }>;

function Declaration({ children, type }: Props) {
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
