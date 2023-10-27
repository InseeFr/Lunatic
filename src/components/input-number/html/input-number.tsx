import type { ReactNode } from 'react';
import { voidFunction } from '../../../utils/function';
import { createCustomizableLunaticField, Errors, Label } from '../../commons';
import InputNumberThousand from './input-number-thousand';
import './input-number.scss';
import type { LunaticError } from '../../../use-lunatic/type';

type Props = {
	id?: string;
	onChange?: (n: number | null) => void;
	value?: number | null;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
	labelId?: string;
	max?: number;
	decimals?: number;
	label?: ReactNode;
	description?: string;
	unit?: string;
	errors?: LunaticError[];
};

function InputNumber({
	id,
	value = null,
	onChange = voidFunction,
	disabled = false,
	readOnly = false,
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
				max={max}
				decimals={decimals}
				invalid={!!errors}
			/>

			{unit && <span>{unit}</span>}
			<Errors errors={errors} />
		</div>
	);
}

export default createCustomizableLunaticField(InputNumber, 'InputNumber');
