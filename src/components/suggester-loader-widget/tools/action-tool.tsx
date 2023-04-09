import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

type Props = PropsWithChildren<{
	ariaLabel?: string;
	className?: string;
	title?: string;
	display?: boolean;
}>;

function ActionTool({
	children,
	ariaLabel,
	className,
	title,
	display = true,
}: Props) {
	if (display) {
		return (
			<div
				aria-label={ariaLabel}
				role="button"
				className={classnames('lunatic-action-tool', className)}
				title={title}
			>
				{children}
			</div>
		);
	}
	return null;
}

export default ActionTool;
