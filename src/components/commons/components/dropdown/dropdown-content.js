import React, { useRef, useCallback } from 'react';
import classnames from 'classnames';
import useDocumentAddEventListener from '../../use-document-add-event-listener';

function DropdownContent({ children, focused, onFocus, onBlur, onKeyDown }) {
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

	return (
		<div
			className={classnames('lunatic-dropdown', {
				focused,
			})}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			ref={ref}
			tabIndex="0"
		>
			<div className={classnames('lunatic-dropdown-content', { focused })}>
				{children}
			</div>
		</div>
	);
}

export default DropdownContent;
