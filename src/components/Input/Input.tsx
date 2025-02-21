import classnames from 'classnames';
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
	handleChanges,
	response,
	errors,
	...props
}: LunaticComponentProps<'Input'>) {
	return (
		<CustomInput
			{...props}
			onChange={(value) => handleChanges([{ name: response.name, value }])}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Input'>,
	'response' | 'handleChanges' | 'errors'
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

	const currentLength = value?.toString().length ?? 0;
	const charactersCountId = `characters-count-${id}`;
	const charactersCountDisplay = `${currentLength}/${maxLength}`;
	const hasReachedMaxLength = currentLength === maxLength;

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
			<div className="field-with-count">
				<input
					id={id}
					aria-labelledby={labelId}
					aria-describedby={maxLength ? charactersCountId : undefined}
					autoComplete="off"
					type="text"
					disabled={disabled}
					readOnly={readOnly}
					value={(value ?? '').toString()}
					title={value ?? ''}
					onChange={(e) => onChange(e.target.value)}
					aria-required={required}
					required={required}
					maxLength={maxLength}
					aria-invalid={!!errors}
					onBlur={(e) => {
						e.target.setSelectionRange(0, 0);
					}}
				/>
				{maxLength && (
					<span
						id={charactersCountId}
						className={classnames('characters-count', {
							'max-length-reached': hasReachedMaxLength,
						})}
					>
						{charactersCountDisplay}
					</span>
				)}
			</div>
			<ComponentErrors errors={errors} />
		</div>
	);
});
