import type { KeyboardEvent } from 'react';
import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../index';

type Props = PropsWithChildren<{
	focused?: boolean;
	onFocus: () => void;
	onKeyDown: (e: KeyboardEvent<Element>) => void;
	className?: string;
}>;

export function ComboBoxContentBox({
	children,
	className,
	onFocus,
	onKeyDown,
	focused,
}: Props) {
	return (
		<div
			className={classnames(`${className ?? 'lunatic'}-combo-box`, {
				focused,
			})}
			onFocus={onFocus}
			onClick={onFocus}
			onKeyDown={onKeyDown}
		>
			{children}
		</div>
	);
}

export default createCustomizableLunaticField(
	ComboBoxContentBox,
	'ComboboxContentBox'
);
