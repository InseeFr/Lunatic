import classnames from 'classnames';
import { type MouseEventHandler, type PropsWithChildren } from 'react';
import { prevent } from '../../../utils/dom';
import { isElement } from '../../../utils/is-element';
import './Button.scss';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
	className?: string;
	disabled?: boolean;
	label?: string;
	value?: string;
	type?: 'button' | 'submit' | 'reset';
}>;

function LunaticButton({
	children,
	onClick,
	disabled,
	label,
	className,
	value,
	type = 'button',
}: Props) {
	const handleClick = prevent(onClick);

	if (isElement(children) || value)
		return (
			<button
				disabled={disabled}
				type={type}
				className={classnames('button-lunatic', className, { disabled })}
				onClick={handleClick}
				value={value}
			>
				{children}
			</button>
		);

	return (
		<>
			<input
				disabled={disabled}
				type="button"
				className={classnames('button-lunatic', className, { disabled })}
				value={label ?? children?.toString()}
				onClick={handleClick}
			/>
		</>
	);
}

export const Button = slottableComponent('Button', LunaticButton);
