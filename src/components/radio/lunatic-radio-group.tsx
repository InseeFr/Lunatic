import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import { createCustomizableLunaticField } from '../commons';
import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../commons/components/errors/errors';
import { CheckboxGroup } from '../commons/components/checkbox-group/checkbox-group';
import type { CheckboxGroupOption } from '../checkbox/checkbox-group/lunatic-checkbox-group';

function LunaticRadioGroup(props: LunaticComponentProps<'Radio'>) {
	const {
		id,
		options,
		value,
		errors,
		handleChange,
		response,
		label,
		description,
		preferences,
		declarations,
		missingResponse,
		missing,
		shortcut,
		management,
		disabled,
		readOnly,
	} = props;
	const onChange = useOnHandleChange({ handleChange, response, value });

	const radioOptions = options.map((option) => {
		return {
			label: option.label,
			name: response.name,
			value: option.value,
			checked: value === option.value,
			description: option.description,
			disabled: disabled,
			readOnly: readOnly,
			onChange: (v) => onChange(v ? option.value : null),
			detailLabel: option.detail?.label,
			onDetailChange: option.detail?.response
				? (value: string | null) => {
						handleChange(option.detail!.response, value);
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
				type="radio"
				options={radioOptions}
				label={label}
				errors={getComponentErrors(errors, id)}
				shortcut={shortcut}
			/>
		</LunaticComponent>
	);
}

export default createCustomizableLunaticField(
	LunaticRadioGroup,
	'LunaticRadioGroup'
);
