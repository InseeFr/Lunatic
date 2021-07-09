import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './fab.scss';

function defaultOnclick() {}

function Fab({ className, children, tabIndex, title, onClick }) {
	return (
		<button
			className={classnames('lunatic-fab', className)}
			tabIndex={tabIndex}
			title={title}
			onclick={onClick}
		>
			{children}
		</button>
	);
}

Fab.propTypes = {
	className: PropTypes.string,
	tabIndex: PropTypes.string,
	onClick: PropTypes.func,
};

Fab.defaultProps = {
	className: undefined,
	tabIndex: '0',
	onClick: defaultOnclick,
};

export default Fab;
