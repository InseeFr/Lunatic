import type { ReactNode } from 'react';
import { voidFunction } from '../../../utils/function';
import { Errors, Label, createCustomizableLunaticField } from '../../commons';
import { type LunaticBaseProps } from '../../type';
import InputNumberThousand from './input-number-thousand';
import './input-number.scss';

type Props = {
	id?: string;
	onChange?: (n: number | null) => void;
	value?: number | null;
	disabled?: boolean;
	readOnly?: boolean;
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
	readOnly = false,
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

	return (
		<div className="lunatic-input-number">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<InputNumberThousand
				id={id}
				value={value}
				onChange={onChange}
				disabled={disabled}
				readOnly={readOnly}
				required={required}
				labelId={labelId}
				min={min}
				max={max}
				decimals={decimals}
			/>

			{unit && <span>{unit}</span>}
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

export default createCustomizableLunaticField(InputNumber, 'InputNumber');
