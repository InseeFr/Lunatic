import type { PropsWithChildren } from 'react';
import classnames from 'classnames';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
	classStyle?: string;
}>;

export function ComboBoxContainer({
	children,
	className,
	id,
	classStyle = 'default-style',
}: Props) {
	return (
		<div
			id={`lunatic-combo-box-container-${id}`}
			className={classnames(
				'lunatic-combo-box-container',
				className,
				classStyle
			)}
		>
			{children}
		</div>
	);
}
