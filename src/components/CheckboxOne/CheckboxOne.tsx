import { RadioGroup } from '../shared/Radio/RadioGroup';
import './CheckboxOne.scss';
import type { LunaticComponentProps } from '../type';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';

/**
 * Checkbox acting as a radio (only one option can be checked at a time)
 */
function LunaticCheckboxOne({
	options,
	value,
	id,
	label,
	description,
	handleChange,
	errors,
	shortcut,
	response,
}: LunaticComponentProps<'CheckboxOne'>) {
	return (
		<RadioGroup
			id={id}
			className="lunatic-checkbox-one"
			options={options}
			value={value}
			errors={getComponentErrors(errors, id)}
			label={label}
			description={description}
			onSelect={(value: string | null) => handleChange(response, value)}
			checkboxStyle={true}
			shortcut={shortcut}
		/>
	);
}

export const CheckboxOne = customizedComponent(
	'CheckboxOne',
	LunaticCheckboxOne
);
