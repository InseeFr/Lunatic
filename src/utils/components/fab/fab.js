import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './fab.scss';

function empty() {}

function Fab({
	className,
	children,
	tabIndex,
	title,
	onClick,
	onKeyDown,
	disabled,
}) {
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

Fab.propTypes = {
	className: PropTypes.string,
	tabIndex: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func,
	title: PropTypes.string,
	disabled: PropTypes.bool,
};

Fab.defaultProps = {
	className: undefined,
	tabIndex: undefined,
	title: 'Fab',
	onClick: empty,
	disabled: false,
	onKeyDown: empty,
};

export default Fab;
