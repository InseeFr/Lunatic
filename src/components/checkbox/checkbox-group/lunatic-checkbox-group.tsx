import React, { ReactNode } from 'react';
import { LunaticComponentProps } from '../../type';
import CheckboxGroup from './html/checkbox-group';
import { wrapWithDeclarations } from '../../commons/hoc/wrap-with-declarations';

export type CheckboxGroupOption = {
	label: ReactNode;
	name: string;
	checked: boolean;
	description?: ReactNode;
	onClick: (b: boolean) => void;
};

const WrappedCheckoupBox = wrapWithDeclarations(CheckboxGroup);

function LunaticCheckboxGroup({
	id,
	value,
	responses,
	shortcut,
	handleChange,
	errors,
	label,
	description,
	declarations,
	missingResponse,
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
		<WrappedCheckoupBox
			id={id}
			label={label}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			description={description}
			handleChange={handleChange}
			options={options}
			errors={errors}
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

export default LunaticCheckboxGroup;
