import React, { HTMLAttributes, PropsWithChildren } from 'react';
import classnames from 'classnames';
import './fab.scss';

type Props = PropsWithChildren<{
	disabled?: boolean;
}> &
	HTMLAttributes<HTMLButtonElement>;

export function Fab({
	className,
	children,
	tabIndex,
	title = 'Fab',
	onClick,
	onKeyDown,
	disabled,
}: Props) {
	return (
		<button
			className={classnames('lunatic-fab', className)}
			tabIndex={tabIndex}
			title={title}
			onClick={onClick}
			onKeyDown={onKeyDown}
			disabled={disabled}
			aria-label={title}
		>
			{children}
		</button>
	);
}
