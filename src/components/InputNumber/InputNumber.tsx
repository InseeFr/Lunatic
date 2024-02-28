import { voidFunction } from '../../utils/function';
import { InputNumberThousand } from './InputNumberThousand';
import './InputNumber.scss';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { Declarations } from '../shared/Declarations/Declarations';

function LunaticInputNumber({
	id,
	value = null,
	handleChange = voidFunction,
	disabled = false,
	readOnly = false,
	max = 1_000_000,
	decimals = 0,
	unit,
	label,
	errors,
	response,
	required = true,
	description,
	declarations,
}: LunaticComponentProps<'InputNumber'>) {
	const labelId = `label-${id}`;

	return (
		<div className="lunatic-input-number">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			<InputNumberThousand
				id={id}
				value={value}
				onChange={(v: number | null) => handleChange(response, v)}
				disabled={disabled}
				readOnly={readOnly}
				required={required}
				labelId={labelId}
				max={max}
				decimals={decimals}
				invalid={!!errors}
			/>
			{unit && <span>{unit}</span>}
			<ComponentErrors errors={errors} componentId={id} />
		</div>
	);
}

export const InputNumber = customizedComponent(
	'InputNumber',
	LunaticInputNumber
);
