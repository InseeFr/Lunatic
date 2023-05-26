import { ReactNode, useState } from 'react';
import { voidFunction } from '../../../utils/function';
import { Errors, Label, createCustomizableLunaticField } from '../../commons';
import { LunaticBaseProps } from '../../type';
import InputNumberDefault from './input-number-default';
import InputNumberThousand from './input-number-thousand';
import './input-number.scss';

type Props = {
	id?: string;
	onChange?: (n: number | null) => void;
	value?: number | null;
	disabled?: boolean;
	required?: boolean;
	labelId?: string;
	min?: number;
	max?: number;
	decimals?: number;
	label?: ReactNode;
	description?: string;
	unit?: string;
	errors?: LunaticBaseProps['errors'];
};

function InputNumber({
	id,
	value = null,
	onChange = voidFunction,
	disabled = false,
	min,
	max,
	decimals = 0,
	unit,
	label,
	errors,
	required = true,
	description,
}: Props) {
	const labelId = `label-${id}`;

	const [useThousandSeparator] = useState(max && max > 1000);

	return (
		<div className="lunatic-input-number">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			{useThousandSeparator && (
				<InputNumberThousand
					id={id}
					value={value}
					onChange={onChange}
					disabled={disabled}
					required={required}
					labelId={labelId}
					max={max}
					decimals={decimals}
				/>
			)}

			{!useThousandSeparator && (
				<InputNumberDefault
					id={id}
					value={value}
					onChange={onChange}
					disabled={disabled}
					required={required}
					labelId={labelId}
					max={max}
					min={min}
					decimals={decimals}
				/>
			)}
			{unit && <span>{unit}</span>}
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

export default createCustomizableLunaticField(InputNumber, 'InputNumber');
