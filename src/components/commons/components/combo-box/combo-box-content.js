import React, { useRef, useCallback } from 'react';
import classnames from 'classnames';
import useDocumentAddEventListener from '../../use-document-add-event-listener';
import { KEYBOARD_KEY_CODES } from './state-management/reducer/reduce-on-keydown/keyboard-key-codes';

function ComboBoxContent({ children, focused, onFocus, onBlur, onKeyDown }) {
	const ref = useRef();

	const onClick = useCallback(
		function (e) {
			const { current } = ref;
			if (!current.contains(e.target)) {
				onBlur();
			}
		},
		[ref, onBlur]
	);

	useDocumentAddEventListener('mousedown', onClick);

	const handleKeyDown = useCallback(
		function (e) {
			const { key } = e;
			e.stopPropagation();
			switch (key) {
				case KEYBOARD_KEY_CODES.Escape:
				case KEYBOARD_KEY_CODES.Enter:
				case KEYBOARD_KEY_CODES.Tab:
					ref.current.focus();
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
			tabIndex="0"
		>
			<div className={classnames('lunatic-combo-box-content', { focused })}>
				{children}
			</div>
		</div>
	);
}

export default ComboBoxContent;
