import React from 'react';
import CheckboxGroup from './html/checkbox-group';
import LunaticComponent from '../../commons/components/lunatic-component-without-label';

function LunaticCheckboxGroup({
	id,
	value,
	responses,
	custom,
	handleChange,
	errors,
	label,
	description,
	preferences,
	declarations,
	missingResponse,
	missing,
	management,
}) {
	const options = responses.map(function ({ label, response, description }) {
		const { name } = response;
		const checked = name in value ? value[name] : false;

		return {
			label,
			name,
			checked,
			description,
			onClick: function (checked) {
				handleChange(response, checked);
			},
		};
	});

	return (
		<LunaticComponent
			id={id}
			label={label}
			custom={custom}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			missing={missing}
			management={management}
			description={description}
		>
			<CheckboxGroup
				id={id}
				options={options}
				value={value}
				custom={custom}
				label={label}
				errors={errors}
			/>
		</LunaticComponent>
	);
}

export default LunaticCheckboxGroup;
