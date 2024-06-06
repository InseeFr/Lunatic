import type { LunaticComponentProps } from '../type';
import { CustomCheckboxGroup } from './CustomCheckboxGroup';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';

export function CheckboxGroup({
	id,
	shortcut,
	readOnly,
	options,
	disabled,
	errors,
	label,
	description,
	declarations,
}: LunaticComponentProps<'CheckboxGroup'>) {
	return (
		<CustomCheckboxGroup
			id={id}
			description={description}
			options={options}
			label={label}
			errors={getComponentErrors(errors, id)}
			shortcut={shortcut}
			disabled={disabled}
			readOnly={readOnly}
			declarations={declarations}
		/>
	);
}
