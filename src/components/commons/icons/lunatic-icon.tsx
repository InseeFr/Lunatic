import classnames from 'classnames';
import './lunatic-icon.scss';
import { PropsWithChildren } from 'react';

export function LunaticIcon({
	className,
	children,
}: PropsWithChildren<{ className?: string }>) {
	return <i className={classnames('lunatic-icon', className)}>{children}</i>;
}
