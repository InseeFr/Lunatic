import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';

function Input({
	placeholder,
	disabled,
	onChange,
	value,
	id,
	labelledBy,
	focused,
	className,
}) {
	const inputEl = useRef();

	useEffect(
		function () {
			if (inputEl.current && focused) {
				inputEl.current.focus();
			}
		},
		[inputEl, focused]
	);

	return (
		<input
			ref={inputEl}
			id={id}
			className={classnames('lunatic-combo-box-input', className)}
			type="text"
			onChange={onChange}
			value={value}
			aria-label="lunatic-combo-box"
			title="combo-box"
			autoComplete="off"
			autoCapitalize="off"
			autoCorrect="off"
			spellCheck="false"
			placeholder={placeholder}
			disabled={disabled}
			aria-labelledby={labelledBy}
		/>
	);
}

export default React.memo(Input);
