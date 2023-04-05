import React from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../commons';

function Notification({ className, title, description }) {
	return (
		<div className={classnames('lunatic-notification', className)}>
			<div className="lunatic-notification-container">
				<div className="title">{title}</div>
				<div className="descripttion">{description}</div>
			</div>
		</div>
	);
}

export default createCustomizableLunaticField(Notification, 'Notification');
