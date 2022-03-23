import React, { useRef, useEffect } from 'react';

function Input({
	placeholder,
	disabled,
	onChange,
	value,
	focused,
	id,
	display,
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
			id={`lunatic-combo-box-input-${id}`}
			tabIndex="0"
			className="lunatic-combo-box-input"
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
		/>
	);
}

export default Input;
