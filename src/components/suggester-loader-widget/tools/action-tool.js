import React from 'react';
import classnames from 'classnames';

function ActionTool({ children, ariaLabel, className, title, display = true }) {
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
