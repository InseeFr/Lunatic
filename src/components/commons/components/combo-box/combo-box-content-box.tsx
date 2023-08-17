import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../index';

type Props = PropsWithChildren<{
	focused?: boolean;
	className?: string;
}>;

export function ComboBoxContentBox({
	children,
	className,
	focused,
}: Props) {
	return (
		<div
			className={classnames(`${className ?? 'lunatic'}-combo-box`, {
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
