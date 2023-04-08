import React, { MouseEventHandler } from 'react';
import Button from '../../button/lunatic-button';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	disabled?: boolean;
	onClick: MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
}>;

function HandleRowButton({ onClick, disabled, children }: Props) {
	return (
		<Button onClick={onClick} disabled={disabled}>
			{children}
		</Button>
	);
}

export default HandleRowButton;
