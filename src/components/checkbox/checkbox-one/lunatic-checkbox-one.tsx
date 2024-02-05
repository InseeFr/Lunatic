import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../../commons/use-on-handle-change';
import CheckboxOne from './html/checkbox-one';
import type { LunaticComponentProps } from '../../type';
import { getComponentErrors } from '../../commons/components/errors/errors';

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
	readOnly,
	disabled,
}: LunaticComponentProps<'CheckboxOne'>) {
	const onSelect = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticComponent
			disabled={readOnly || disabled}
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
			<CheckboxOne
				id={id}
				className="lunatic-checkbox-one"
				options={options}
				value={value}
				errors={getComponentErrors(errors, id)}
				onSelect={onSelect}
				label={label}
				shortcut={shortcut}
				readOnly={readOnly}
				disabled={disabled}
			/>
		</LunaticComponent>
	);
}

export default LunaticCheckboxOne;
