import React, {
	useRef,
	useEffect,
	type HTMLAttributes,
	type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { customizedComponent } from '../../../../shared/HOC/customizedComponent';

export type InputProps = {
	placeholder?: string;
	disabled?: boolean;
	value?: string;
	labelledBy?: string;
	focused?: boolean;
	invalid?: boolean;
} & HTMLAttributes<HTMLInputElement>;

function Input({
	placeholder,
	disabled,
	onChange,
	value,
	id,
	labelledBy,
	focused,
	className,
	invalid,
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
			aria-label="lunatic-combo-box"
			aria-invalid={invalid}
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

export default customizedComponent('ComboboxInput', Input);
