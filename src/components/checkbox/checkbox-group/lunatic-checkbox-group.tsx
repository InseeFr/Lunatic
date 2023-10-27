import React, { type ReactNode } from 'react';
import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import type { LunaticComponentProps } from '../../type';
import CheckboxGroup from './html/checkbox-group';

export type CheckboxGroupOption = {
	label: ReactNode;
	name: string;
	checked: boolean;
	description?: ReactNode;
	onClick: (b: boolean) => void;
};

function LunaticCheckboxGroup({
	id,
	value,
	responses,
	shortcut,
	handleChange,
	errors,
	label,
	description,
	preferences,
	declarations,
	missingResponse,
	missing,
	management,
}: LunaticComponentProps<'CheckboxGroup'>) {
	const options = responses.map(({ label, response, description }) => {
		const { name } = response;

		return {
			label,
			name,
			checked: castValueToBoolean(value, name),
			description,
			onClick: function (checked: boolean) {
				handleChange(response, checked);
			},
		};
	}) satisfies CheckboxGroupOption[];

	return (
		<LunaticComponent
			id={id}
			label={label}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			missing={missing}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<CheckboxGroup
				id={id}
				options={options}
				label={label}
				errors={errors}
				shortcut={shortcut}
			/>
		</LunaticComponent>
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

export default LunaticCheckboxGroup;
