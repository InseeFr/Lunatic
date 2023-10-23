import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../../commons/use-on-handle-change';
import type { LunaticComponentProps } from '../../type';
import CheckboxBoolean from './html/checkbox-boolean';
import { getComponentErrors } from '../../commons/components/errors/errors';

function LunaticCheckboxBoolean({
	value,
	id,
	options,
	disabled,
	handleChange,
	response,
	errors,
	label,
	preferences,
	declarations,
	missing,
	missingResponse,
	management,
	description,
}: LunaticComponentProps<'CheckboxBoolean'>) {
	const onChange = useOnHandleChange({ handleChange, response, value });
	console.log({ errors, computed: getComponentErrors(errors, id), id });
	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<CheckboxBoolean
				id={id}
				checked={value ?? false}
				onClick={onChange}
				disabled={disabled}
				label={label}
				errors={getComponentErrors(errors, id)}
			/>
		</LunaticComponent>
	);
}

LunaticCheckboxBoolean.defaultProps = { value: false };

export default LunaticCheckboxBoolean;
