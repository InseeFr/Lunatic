import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './fab.scss';

function Fab({ className, children, tabIndex }) {
	return (
		<button
			className={classnames('lunatic-fab', className)}
			tabIndex={tabIndex}
		>
			{children}
		</button>
	);
}

Fab.propTypes = { className: PropTypes.string, tabIndex: PropTypes.string };

Fab.defaultProps = { className: undefined, tabIndex: '0' };

export default Fab;
