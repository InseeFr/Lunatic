import React from 'react';
import classnames from 'classnames';

function Notification({ className, title, description }) {
	return (
		<div className={classnames('lunatic-notification', className)}>
			<div className="title">{title}</div>
			<div className="descripttion">{description}</div>
		</div>
	);
}

export default Notification;
