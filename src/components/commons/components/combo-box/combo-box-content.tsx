import type { KeyboardEvent } from 'react';
import React, { PropsWithChildren, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { KEYBOARD_KEY_CODES } from './state-management/reduce-on-keydown/keyboard-key-codes';
import { useDocumentAddEventListener } from '../../index';
import ComboBoxContentBox from './combo-box-content-box';

type Props = PropsWithChildren<{
	focused?: boolean;
	onBlur: () => void;
	onFocus: () => void;
	onKeyDown: (key: string) => void;
	className?: string;
}>;

export function ComboBoxContent({
	children,
	focused,
	onFocus,
	onBlur,
	onKeyDown,
	className,
}: Props) {
	const ref = useRef<HTMLDivElement>(null);

	const onClick = useCallback(
		(e: Event) => {
			if (!ref.current?.contains(e.target as HTMLElement) && onBlur) {
				onBlur();
			}
		},
		[ref, onBlur]
	);

	useDocumentAddEventListener('mousedown', onClick);

	const handleKeyDown = useCallback(
		function (e: KeyboardEvent) {
			const { key } = e;
			e.stopPropagation();
			switch (key) {
				case KEYBOARD_KEY_CODES.Escape:
				case KEYBOARD_KEY_CODES.Enter:
				case KEYBOARD_KEY_CODES.Tab:
					ref.current?.focus();
					break;
				default:
				// e.preventDefault();
			}
			onKeyDown(key);
		},
		[onKeyDown]
	);

	return (
		<ComboBoxContentBox
			className={className}
			onFocus={onFocus}
			onKeyDown={handleKeyDown}
		>
			<div
				className={classnames(`${className ?? 'lunatic'}-combo-box-content`, {
					focused,
				})}
				ref={ref}
				tabIndex={0}
			>
				{children}
			</div>
		</ComboBoxContentBox>
	);
}

export default ComboBoxContent;
