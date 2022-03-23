import React, { useRef, useCallback } from 'react';
import classnames from 'classnames';
import useDocumentAddEventListener from '../../use-document-add-event-listener';

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
			if (e.key === 'Tab') {
				ref.current.focus();
			}
			onKeyDown(e);
		},
		[onKeyDown]
	);

	return (
		<div
			className={classnames('lunatic-combo-box', {
				focused,
			})}
			onFocus={onFocus}
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
