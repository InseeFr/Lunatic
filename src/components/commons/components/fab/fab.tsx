import React, { HTMLAttributes, PropsWithChildren } from 'react';
import classnames from 'classnames';
import './fab.scss';
import { voidFunction } from '../../../../utils/function';

type Props = PropsWithChildren<{
	disabled?: boolean;
}> &
	HTMLAttributes<HTMLButtonElement>;

function Fab({
	className,
	children,
	tabIndex,
	title = 'Fab',
	onClick = voidFunction,
	onKeyDown = voidFunction,
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

export default Fab;
