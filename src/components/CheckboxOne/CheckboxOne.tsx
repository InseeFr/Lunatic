import { RadioGroup } from '../shared/Radio/RadioGroup';
import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';

/**
 * Checkbox acting as a radio (only one option can be checked at a time)
 */
export function CheckboxOne({
	options,
	value,
	id,
	label,
	description,
	errors,
	disabled,
	readOnly,
	shortcut,
	declarations,
}: LunaticComponentProps<'CheckboxOne'>) {
	return (
		<RadioGroup
			id={id}
			className="lunatic-checkbox-one"
			options={options}
			value={value}
			disabled={disabled}
			readOnly={readOnly}
			errors={getComponentErrors(errors, id)}
			label={label}
			description={description}
			checkboxStyle={true}
			shortcut={shortcut}
			declarations={declarations}
			clearable
		/>
	);
}
