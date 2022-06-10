import React from 'react';
import classnames from 'classnames';
import './lunatic-icon.scss';

function ClosedIcon({ className, children }) {
	return <i className={classnames('lunatic-icon', className)}>{children}</i>;
}

export default ClosedIcon;
