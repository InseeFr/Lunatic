import type { LunaticComponentProps } from '../type';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { CheckboxOption } from '../shared/Checkbox/CheckboxOption';
import { customizedComponent } from '../shared/HOC/customizedComponent';

function LunaticCheckboxBoolean({
	value,
	id,
	disabled,
	errors,
	label,
	response,
	handleChange,
	description,
}: LunaticComponentProps<'CheckboxBoolean'>) {
	return (
		<div className="lunatic-checkbox-boolean">
			<CheckboxOption
				disabled={disabled}
				checked={value ?? false}
				id={id}
				onClick={(v: boolean) => handleChange(response, v)}
				label={label}
				description={description}
				invalid={!!errors}
			/>
			<ComponentErrors errors={errors} componentId={id} />
		</div>
	);
}

export const CheckboxBoolean = customizedComponent(
	'CheckboxBoolean',
	LunaticCheckboxBoolean
);
