import useOnHandleChange from '../commons/use-on-handle-change';
import Dropdown from './html/dropdown';
import { LunaticComponentProps } from '../type';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const WrappedDropdown = wrapWithDeclarations(Dropdown);

function LunaticDropdown({
	id,
	handleChange,
	options,
	writable,
	disabled,
	value,
	response,
	errors,
	label,
	declarations,
	missingResponse,
	description,
}: LunaticComponentProps<'Dropdown'>) {
	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<WrappedDropdown
			declarations={declarations}
			missingResponse={missingResponse}
			description={description}
			handleChange={handleChange}
			id={id}
			writable={writable}
			disabled={disabled}
			options={options}
			onSelect={onChange}
			value={value}
			className="lunatic-dropdown"
			errors={errors}
			label={label}
		/>
	);
}

export default LunaticDropdown;
