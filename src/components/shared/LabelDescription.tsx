import classnames from 'classnames';
import React, { type ReactNode } from 'react';

type Props = {
	value?: ReactNode;
	className?: string;
};

export function LabelDescription({ value, className }: Props) {
	if (
		(typeof value === 'string' && value.length > 0) ||
		React.isValidElement(value)
	) {
		return (
			<span className={classnames('label-description', className)}>
				{value}
			</span>
		);
	}

	return null;
}
