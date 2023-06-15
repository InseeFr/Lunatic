import useOnHandleChange from '../../commons/use-on-handle-change';
import { LunaticComponentProps } from '../../type';
import CheckboxBoolean from './html/checkbox-boolean';
import { wrapWithDeclarations } from '../../commons/hoc/wrap-with-declarations';

const WrappedCheckboxBoolean = wrapWithDeclarations(CheckboxBoolean);

function LunaticCheckboxBoolean({
	value,
	id,
	disabled,
	handleChange,
	response,
	errors,
	label,
	declarations,
	missingResponse,
	description,
}: LunaticComponentProps<'CheckboxBoolean'>) {
	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<WrappedCheckboxBoolean
			id={id}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			description={description}
			handleChange={handleChange}
			checked={value ?? false}
			onClick={onChange}
			disabled={disabled}
			label={label}
			errors={errors}
		/>
	);
}

LunaticCheckboxBoolean.defaultProps = { value: false };

export default LunaticCheckboxBoolean;
