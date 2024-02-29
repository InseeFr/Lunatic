import { type ReactNode } from 'react';
import classnames from 'classnames';
import { slottableComponent } from './HOC/slottableComponent';

type Props = {
	className?: string;
	title: ReactNode;
	description: ReactNode;
};

function LunaticNotification({ className, title, description }: Props) {
	return (
		<div className={classnames('lunatic-notification', className)}>
			<div className="lunatic-notification-container">
				<div className="title">{title}</div>
				<div className="descripttion">{description}</div>
			</div>
		</div>
	);
}

export const Notification = slottableComponent(
	'Notification',
	LunaticNotification
);
