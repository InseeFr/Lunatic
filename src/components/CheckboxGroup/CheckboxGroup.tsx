import type { LunaticComponentProps } from '../type';
import { CustomCheckboxGroup } from './CustomCheckboxGroup';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { useLunaticComponentsOptions } from '../../use-lunatic/lunatic-context';

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
	orientation,
}: LunaticComponentProps<'CheckboxGroup'>) {
	const { detailAlwaysDisplayed } = useLunaticComponentsOptions();
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
			orientation={orientation}
			detailAlwaysDisplayed={detailAlwaysDisplayed}
		/>
	);
}
