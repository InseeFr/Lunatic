import type { LunaticComponentProps } from '../type';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { CheckboxOption } from '../shared/Checkbox/CheckboxOption';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { Declarations } from '../shared/Declarations/Declarations';
import type { LunaticError } from '../../use-lunatic/type';

export function CheckboxBoolean({
	handleChange,
	response,
	errors,
	value,
	...props
}: LunaticComponentProps<'CheckboxBoolean'>) {
	const checked = !!value;
	return (
		<CustomCheckboxBoolean
			{...props}
			checked={checked}
			onChange={() => handleChange(response, !checked)}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'CheckboxBoolean'>,
	'response' | 'handleChange' | 'errors' | 'value'
> & {
	onChange: () => void;
	errors?: LunaticError[];
	checked?: boolean;
};

export const CustomCheckboxBoolean = slottableComponent<CustomProps>(
	'Input',
	(props) => {
		const {
			disabled,
			checked,
			id,
			onChange,
			label,
			declarations,
			description,
			errors,
		} = props;
		return (
			<div className="lunatic-checkbox-boolean">
				<CheckboxOption
					disabled={disabled}
					checked={checked}
					id={id}
					onClick={onChange}
					label={
						<>
							{label}
							<Declarations
								type="AFTER_QUESTION_TEXT"
								declarations={declarations}
							/>
						</>
					}
					description={description}
					invalid={!!errors}
				/>
				<ComponentErrors errors={errors} />
			</div>
		);
	}
);
