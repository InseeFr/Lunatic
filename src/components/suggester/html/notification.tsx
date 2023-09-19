import { type ReactNode } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../commons';

type Props = {
	className?: string;
	title: ReactNode;
	description: ReactNode;
};

function Notification({ className, title, description }: Props) {
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
