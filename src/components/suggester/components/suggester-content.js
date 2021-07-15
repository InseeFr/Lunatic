import React, { useRef, useCallback } from 'react';
import classnames from 'classnames';
import { useDocumentAddEventListener } from '../commons-tools';

function SuggesterContent({
	children,
	id,
	focused,
	onFocus,
	onBlur,
	onKeyDown,
}) {
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
			className={classnames('lunatic-suggester', {
				focused,
			})}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			ref={ref}
		>
			<div className={classnames('lunatic-suggester-content', { focused })}>
				{children}
			</div>
		</div>
	);
}

export default SuggesterContent;
