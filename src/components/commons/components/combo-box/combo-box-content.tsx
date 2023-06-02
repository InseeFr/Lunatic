import classnames from 'classnames';
import type { KeyboardEvent } from 'react';
import { PropsWithChildren, useCallback, useRef } from 'react';
import { useDocumentAddEventListener } from '../../index';
import { KEYBOARD_KEY_CODES } from './state-management/reduce-on-keydown/keyboard-key-codes';

type Props = PropsWithChildren<{
	focused?: boolean;
	onBlur: () => void;
	onFocus: () => void;
	onKeyDown: (key: string) => void;
}>;

export function ComboBoxContent({
	children,
	focused,
	onFocus,
	onBlur,
	onKeyDown,
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
		<div
			className={classnames('lunatic-combo-box', {
				focused,
			})}
			onFocus={onFocus}
			onClick={onFocus}
			onKeyDown={handleKeyDown}
			ref={ref}
			tabIndex={0}
		>
			<div className={classnames('lunatic-combo-box-content', { focused })}>
				{children}
			</div>
		</div>
	);
}

export default ComboBoxContent;
