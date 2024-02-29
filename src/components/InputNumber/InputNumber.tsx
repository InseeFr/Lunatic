import { InputNumberThousand } from './InputNumberThousand';
import './InputNumber.scss';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { Declarations } from '../shared/Declarations/Declarations';
import type { LunaticError } from '../../use-lunatic/type';

export function InputNumber({
	handleChange,
	response,
	errors,
	decimals,
	...props
}: LunaticComponentProps<'InputNumber'>) {
	return (
		<CustomInputNumber
			{...props}
			decimals={decimals ?? 0}
			onChange={(v) => handleChange(response, v)}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'InputNumber'>,
	'response' | 'handleChange' | 'errors'
> & {
	onChange: (v: number | null) => void;
	errors?: LunaticError[];
};

export const CustomInputNumber = slottableComponent<CustomProps>(
	'InputNumber',
	(props) => {
		const {
			id,
			value,
			onChange,
			disabled,
			readOnly,
			max,
			decimals,
			unit,
			label,
			errors,
			required,
			description,
			declarations,
		} = props;
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
					onChange={onChange}
					disabled={!!disabled}
					readOnly={!!readOnly}
					required={!!required}
					labelId={labelId}
					max={max}
					decimals={decimals}
					invalid={!!errors}
				/>
				{unit && <span>{unit}</span>}
				<ComponentErrors errors={errors} />
			</div>
		);
	}
);
