import React, { type PropsWithChildren } from 'react';
import classnames from 'classnames';
import { customizedComponent } from '../HOC/customizedComponent';

type Props = PropsWithChildren<{
	focused?: boolean;
	classNamePrefix?: string;
}>;

export const ComboboxContentBox = customizedComponent<Props>(
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
