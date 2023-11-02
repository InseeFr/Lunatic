import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../../commons/use-on-handle-change';
import type { LunaticComponentProps } from '../../type';
import { getComponentErrors } from '../../commons/components/errors/errors';
import type { CheckboxGroupOption } from '../checkbox-group/lunatic-checkbox-group';
import { CheckboxGroup } from '../../commons/components/checkbox-group/checkbox-group';

function LunaticCheckboxOne({
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
	management,
	shortcut,
}: LunaticComponentProps<'CheckboxOne'>) {
	const onSelect = useOnHandleChange({ handleChange, response, value });

	const checkboxOptions = options.map((option) => {
		return {
			label: option.label,
			name: response.name,
			value: option.value,
			checked: value === option.value,
			description: option.description,
			onChange: (v) => onSelect(v ? option.value : null),
			detailLabel: option.detail?.label,
			onDetailChange: option.detail?.response
				? (value: string | null) => {
						handleChange(option.detail!.response, value);
				  }
				: undefined,
		};
	}) satisfies CheckboxGroupOption[];

	const handleArrowNavigation = (direction: -1 | 1, focusedIndex: number) => {
		const newIndex = focusedIndex + direction;
		if (newIndex < 0 || newIndex >= checkboxOptions.length) {
			return;
		}
		onSelect(checkboxOptions[newIndex].value);
	};

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
				options={checkboxOptions}
				label={label}
				errors={getComponentErrors(errors, id)}
				shortcut={shortcut}
				onArrowNavigation={handleArrowNavigation}
			/>
		</LunaticComponent>
	);
}

export default LunaticCheckboxOne;
