import { type ChangeEventHandler } from 'react';
import './Textarea.scss';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { Declarations } from '../shared/Declarations/Declarations';
import type { LunaticError } from '../../use-lunatic/type';
import { CustomInput } from '../Input/Input';

export function Textarea({
	handleChange,
	response,
	errors,
	...props
}: LunaticComponentProps<'Textarea'>) {
	return (
		<CustomTextarea
			{...props}
			onChange={(v) => handleChange(response, v)}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Textarea'>,
	'response' | 'handleChange' | 'errors'
> & {
	onChange: (v: string) => void;
	errors?: LunaticError[];
};

export const CustomTextarea = slottableComponent<CustomProps>(
	'Textarea',
	(props) => {
		const {
			value,
			onChange,
			disabled,
			required,
			maxLength,
			label,
			description,
			id,
			errors,
			readOnly,
			declarations,
			rows,
			cols,
			placeHolder,
		} = props;
		const labelId = `label-${id}`;

		return (
			<div className="lunatic-textarea">
				<Label htmlFor={id} id={labelId} description={description}>
					{label}
				</Label>
				<Declarations
					type="AFTER_QUESTION_TEXT"
					declarations={declarations}
					id={id}
				/>
				<textarea
					required={required}
					disabled={disabled}
					id={id}
					rows={rows}
					maxLength={maxLength}
					cols={cols}
					onChange={(e) => onChange(e.target.value)}
					value={value ?? ''}
					placeholder={placeHolder}
					readOnly={readOnly}
					aria-invalid={!!errors}
				/>
				<ComponentErrors errors={errors} />
			</div>
		);
	}
);
