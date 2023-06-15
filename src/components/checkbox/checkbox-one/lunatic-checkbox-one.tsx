import useOnHandleChange from '../../commons/use-on-handle-change';
import CheckboxOne from './html/checkbox-one';
import { LunaticComponentProps } from '../../type';
import { wrapWithDeclarations } from '../../commons/hoc/wrap-with-declarations';

const WrappedCheckboxOne = wrapWithDeclarations(CheckboxOne);

function LunaticCheckboxOne({
	id,
	options,
	value,
	errors,
	handleChange,
	response,
	label,
	description,
	declarations,
	missingResponse,
	shortcut,
}: LunaticComponentProps<'CheckboxOne'>) {
	const onSelect = useOnHandleChange({ handleChange, response, value });

	return (
		<WrappedCheckboxOne
			id={id}
			label={label}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			description={description}
			handleChange={handleChange}
			className="lunatic-checkbox-one"
			options={options}
			errors={errors}
			onSelect={onSelect}
			shortcut={shortcut}
		/>
	);
}

export default LunaticCheckboxOne;
