import classnames from 'classnames';
import { ChangeEventHandler, useCallback, useState } from 'react';

type Props = {
	id?: string;
	onChange: (n: number | null) => void;
	value?: number | null;
	disabled?: boolean;
	required?: boolean;
	labelId?: string;
	min?: number;
	max?: number;
	decimals?: number;
};

function InputNumberDefault({
	id,
	value,
	onChange,
	disabled = false,
	required = true,
	labelId,
	min,
	max,
	decimals,
}: Props) {
	// Decimals is a number indicates the number behind the separator of decimals
	// Computing step attribute of input according to decimal number
	const [step] = useState(decimals ? 1 / Math.pow(10, decimals) : 1);

	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		function (e) {
			const val = e.target.valueAsNumber;
			onChange(Number.isNaN(val) ? null : val);
		},
		[onChange]
	);
	return (
		<input
			id={id}
			className={classnames({ disabled })}
			type="number"
			inputMode={decimals ? 'decimal' : 'numeric'}
			onChange={handleChange}
			value={value ?? ''}
			aria-labelledby={labelId}
			disabled={disabled}
			required={required}
			min={min}
			max={max}
			step={step}
			lang="en"
		/>
	);
}

export default InputNumberDefault;
