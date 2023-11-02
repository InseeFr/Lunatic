import React, { type ReactNode } from 'react';
import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import type { LunaticComponentProps } from '../../type';
import { CheckboxGroup } from '../../commons/components/checkbox-group/checkbox-group';
import { getComponentErrors } from '../../commons/components/errors/errors';

export type CheckboxGroupOption = {
	label: ReactNode;
	name: string;
	checked: boolean;
	description?: ReactNode;
	onChange: (v: boolean) => void;
	onDetailChange?: (v: string | null) => void;
	detailLabel?: ReactNode;
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
	const options = responses.map(({ label, response, description, detail }) => {
		const { name } = response;

		return {
			label,
			name,
			checked: castValueToBoolean(value, name),
			description,
			onChange: function (checked: boolean) {
				handleChange(response, checked);
			},
			detailLabel: detail?.label,
			onDetailChange: detail?.response
				? (value: string | null) => {
						handleChange(detail.response, value);
				  }
				: undefined,
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
				errors={getComponentErrors(errors, id)}
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
