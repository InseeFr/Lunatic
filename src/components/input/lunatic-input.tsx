import Input from './html/input';
import useOnHandleChange from '../commons/use-on-handle-change';
import { LunaticComponentProps } from '../type';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';
import description from '../commons/components/description';

const WrappedInput = wrapWithDeclarations(Input);

function LunaticInput(props: LunaticComponentProps<'Input'>) {
	const {
		id,
		value,
		handleChange,
		response,
		errors,
		declarations,
		label,
		disabled,
		missingResponse,
		required,
		maxLength,
		description,
	} = props;
	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<WrappedInput
			declarations={declarations}
			missingResponse={missingResponse}
			handleChange={handleChange}
			id={id}
			value={value}
			onChange={onChange}
			label={label}
			disabled={disabled}
			errors={errors}
			required={required}
			description={description}
			maxLength={maxLength}
		/>
	);
}

export default LunaticInput;
