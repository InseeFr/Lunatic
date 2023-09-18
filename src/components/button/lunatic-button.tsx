import React, {
	type MouseEventHandler,
	type PropsWithChildren,
	useCallback,
} from 'react';
import classnames from 'classnames';
import { isElement } from '../../utils/is-element';
import { createCustomizableLunaticField } from '../commons';
import './button.scss';

type Props = PropsWithChildren<{
	onClick: MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
	className?: string;
	disabled?: boolean;
	label?: string;
}>;

function Button({ children, onClick, disabled, label, className }: Props) {
	const handleClick: Props['onClick'] = useCallback(
		function (e) {
			e.stopPropagation();
			e.preventDefault();
			onClick?.(e);
		},
		[onClick]
	);

	if (isElement(children))
		return (
			<button
				disabled={disabled}
				type="button"
				className={classnames('button-lunatic', className, { disabled })}
				onClick={handleClick}
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
				value={label || children?.toString()}
				onClick={handleClick}
			/>
		</>
	);
}

export default createCustomizableLunaticField(Button, 'Button');
