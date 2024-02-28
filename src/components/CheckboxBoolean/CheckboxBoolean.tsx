import type { LunaticComponentProps } from '../type';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { CheckboxOption } from '../shared/Checkbox/CheckboxOption';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { Declarations } from '../shared/Declarations/Declarations';

function LunaticCheckboxBoolean({
	value,
	id,
	disabled,
	errors,
	label,
	response,
	handleChange,
	declarations,
	description,
}: LunaticComponentProps<'CheckboxBoolean'>) {
	return (
		<div className="lunatic-checkbox-boolean">
			<CheckboxOption
				disabled={disabled}
				checked={value ?? false}
				id={id}
				onClick={(v: boolean) => handleChange(response, v)}
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
			<ComponentErrors errors={errors} componentId={id} />
		</div>
	);
}

export const CheckboxBoolean = customizedComponent(
	'CheckboxBoolean',
	LunaticCheckboxBoolean
);
