import React, { ChangeEventHandler, ReactNode, useCallback } from 'react';
import { createCustomizableLunaticField, Errors, Label } from '../../commons';
import './textarea.scss';
import { LunaticBaseProps } from '../../type';

type Props = {
	id?: string;
	rows?: number;
	maxLength?: number;
	cols?: number;
	onChange: (n: string) => void;
	placeholder?: string;
	label?: ReactNode;
	value?: string | number | null;
	description?: LunaticBaseProps['description'];
	errors?: LunaticBaseProps['errors'];
};

function Textarea({
	id,
	rows,
	maxLength,
	cols,
	onChange,
	value,
	placeholder,
	label,
	description,
	errors,
}: Props) {
	const labelId = `label-${id}`;
	const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	return (
		<div className="lunatic-textarea">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<textarea
				id={id}
				rows={rows}
				maxLength={maxLength}
				cols={cols}
				onChange={handleChange}
				value={checkValue(value)}
				placeholder={placeholder}
			/>
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

function checkValue(value?: string | null | number) {
	return value ?? '';
}

export default createCustomizableLunaticField(Textarea, 'Textarea');
