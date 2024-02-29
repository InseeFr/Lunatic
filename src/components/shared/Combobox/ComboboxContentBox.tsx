import React, { type PropsWithChildren } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	focused?: boolean;
	classNamePrefix?: string;
}>;

export const ComboboxContentBox = slottableComponent<Props>(
	'ComboboxContentBox',
	({ children, classNamePrefix, focused }) => (
		<div
			className={classnames(`${classNamePrefix ?? 'lunatic'}-combo-box`, {
				focused,
			})}
		>
			{children}
		</div>
	)
);
