import { type MouseEventHandler, type PropsWithChildren } from 'react';
import Button from '../button/lunatic-button';

type Props = PropsWithChildren<{
	disabled?: boolean;
	onClick: MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
}>;

export function LoopButton({ onClick, disabled, children }: Props) {
	return (
		<Button onClick={onClick} disabled={disabled}>
			{children}
		</Button>
	);
}
