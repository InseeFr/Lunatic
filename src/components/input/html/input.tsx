import classnames from 'classnames';
import React, { ChangeEventHandler, ReactNode, useCallback, useState } from 'react';
import { createCustomizableLunaticField, Errors, Label } from '../../commons';
import './input.scss';
import { LunaticBaseProps } from '../../type';

type Props = {
	label?: ReactNode;
	onChange: (v: string) => void;
	description?: string;
	errors: LunaticBaseProps['errors'];
	value?: string | null;
	disabled?: boolean;
	required?: boolean;
	maxLength?: number;
	id?: string;
};

function Input({
	value,
	onChange,
	disabled,
	required,
	maxLength,
	label,
	description,
	id,
	errors,
}: Props) {
	const labelId = `label-${id}`;
  const [localValue, setLocalValue] = useState<string | null | undefined>(value);
	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		function (e) {
			const value = e.target.value;
      setLocalValue(value)
			onChange(value);
		},
		[onChange]
	);
	return (
		<div className={classnames('lunatic-input')}>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<input
				id={id}
				aria-labelledby={labelId}
				autoComplete="off"
				type="text"
				disabled={disabled}
				value={checkValue(localValue)}
				onChange={handleChange}
				aria-required={required}
				required={required}
				maxLength={maxLength}
			/>
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

function checkValue(value?: unknown) {
	return (value ?? '').toString();
}

export default createCustomizableLunaticField(Input, 'Input');
