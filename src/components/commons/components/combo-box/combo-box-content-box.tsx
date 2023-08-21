import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../index';

type Props = PropsWithChildren<{
	focused?: boolean;
	classNamePrefix?: string;
}>;

export function ComboBoxContentBox({
	children,
	classNamePrefix,
	focused,
}: Props) {
	return (
		<div
			className={classnames(`${classNamePrefix ?? 'lunatic'}-combo-box`, {
				focused,
			})}
		>
			{children}
		</div>
	);
}

export default createCustomizableLunaticField(
	ComboBoxContentBox,
	'ComboboxContentBox'
);
