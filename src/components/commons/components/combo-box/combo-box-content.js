import React, { useRef, useCallback } from 'react';
import classnames from 'classnames';
import { KEYBOARD_KEY_CODES } from './state-management/reducer/reduce-on-keydown/keyboard-key-codes';

function ComboBoxContent({ children, focused, onFocus, onBlur, onKeyDown }) {
	const ref = useRef();

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
			onBlur={onBlur}
			onKeyDown={handleKeyDown}
			onClick={onFocus}
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
