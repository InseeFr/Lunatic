import { type ReactNode } from 'react';
import type { LunaticComponentProps } from '../type';
import { CustomCheckboxGroup } from './CustomCheckboxGroup';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';

export type CheckboxGroupOption = {
	id: string;
	label: ReactNode;
	name: string;
	checked: boolean;
	description?: ReactNode;
	onClick: (b: boolean) => void;
};

export function CheckboxGroup({
	id,
	value,
	responses,
	shortcut,
	handleChange,
	errors,
	label,
	description,
}: LunaticComponentProps<'CheckboxGroup'>) {
	const options = responses.map(({ label, response, description, id }) => {
		const { name } = response;

		return {
			label,
			name,
			id,
			checked: castValueToBoolean(value, name),
			description,
			onClick: function (checked: boolean) {
				handleChange(response, checked);
			},
		};
	}) satisfies CheckboxGroupOption[];

	return (
		<CustomCheckboxGroup
			id={id}
			description={description}
			options={options}
			label={label}
			errors={getComponentErrors(errors, id)}
			shortcut={shortcut}
		/>
	);
}

function castValueToBoolean(
	value: LunaticComponentProps<'CheckboxGroup'>['value'],
	name: string
): boolean {
	if (value && name in value) {
		return value[name] ?? false;
	}
	return false;
}
