import classnames from 'classnames';
import './Input.scss';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { Declarations } from '../shared/Declarations/Declarations';
import type { LunaticError } from '../../use-lunatic/type';

export function Input({
	handleChange,
	response,
	errors,
	...props
}: LunaticComponentProps<'Input'>) {
	return (
		<CustomInput
			{...props}
			onChange={(v) => handleChange(response, v)}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Input'>,
	'response' | 'handleChange' | 'errors'
> & {
	onChange: (v: string) => void;
	errors?: LunaticError[];
};

export const CustomInput = slottableComponent<CustomProps>('Input', (props) => {
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
	} = props;
	const labelId = `label-${id}`;
	return (
		<div className={classnames('lunatic-input')}>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			<input
				id={id}
				aria-labelledby={labelId}
				autoComplete="off"
				type="text"
				disabled={disabled}
				readOnly={readOnly}
				value={(value ?? '').toString()}
				onChange={(e) => onChange(e.target.value)}
				aria-required={required}
				required={required}
				maxLength={maxLength}
				aria-invalid={!!errors}
			/>
			<ComponentErrors errors={errors} />
		</div>
	);
});
