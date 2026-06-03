import React, {
	useRef,
	useEffect,
	type HTMLAttributes,
	type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../../HOC/slottableComponent';

export type InputProps = {
	placeholder?: string;
	disabled?: boolean;
	value?: string;
	labelledBy?: string;
	focused?: boolean;
	invalid?: boolean;
	readOnly?: boolean;
	required?: boolean;
} & HTMLAttributes<HTMLInputElement>;

function LunaticComboboxInput({
	placeholder,
	disabled,
	onChange,
	value,
	id,
	labelledBy,
	focused,
	className,
	invalid,
	required,
}: InputProps) {
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
			ref={inputEl}
			id={id}
			className={classnames('lunatic-combo-box-input', className)}
			type="text"
			onChange={onChange}
			value={value}
			aria-invalid={invalid}
			aria-required={required}
			required={required}
			title="combo-box"
			autoComplete="off"
			autoCapitalize="off"
			autoCorrect="off"
			spellCheck="false"
			placeholder={placeholder}
			disabled={disabled}
			aria-labelledby={labelledBy}
			onKeyDown={onKeydown}
		/>
	);
}

export const ComboboxInput = slottableComponent(
	'ComboboxInput',
	LunaticComboboxInput
);
