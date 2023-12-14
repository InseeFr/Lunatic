import React, {
	useRef,
	useEffect,
	type HTMLAttributes,
	type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import createCustomizableLunaticField from '../../../create-customizable-field';

export type InputProps = {
	placeholder?: string;
	disabled?: boolean;
	value?: string;
	focused?: boolean;
} & HTMLAttributes<HTMLInputElement>;

function Input({ focused, className, ...props }: InputProps) {
	const inputEl = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputEl.current && focused) {
			inputEl.current.focus();
		}
	}, [inputEl, focused]);

	const onKeydown: KeyboardEventHandler = (e) => {
		const { key } = e;
		if (key === 'ArrowUp' || key === 'ArrowDown') {
			e.preventDefault();
		}
	};

	return (
		<input
			{...props}
			ref={inputEl}
			className={classnames('lunatic-combo-box-input', className)}
			type="text"
			aria-label="lunatic-combo-box"
			title="combo-box"
			autoComplete="off"
			autoCapitalize="off"
			autoCorrect="off"
			spellCheck="false"
			onKeyDown={onKeydown}
		/>
	);
}

export default createCustomizableLunaticField(Input, 'ComboboxInput');
