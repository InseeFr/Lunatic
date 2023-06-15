import RadioGroup from './html/radio-group';
import useOnHandleChange from '../commons/use-on-handle-change';
import { createCustomizableLunaticField } from '../commons';
import { LunaticComponentProps } from '../type';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const WrappedRadioGroup = wrapWithDeclarations(RadioGroup);

function LunaticRadioGroup(props: LunaticComponentProps<'Radio'>) {
	const {
		id,
		options,
		value,
		checkboxStyle,
		errors,
		handleChange,
		response,
		label,
		description,
		declarations,
		missingResponse,
		shortcut,
		className = 'lunatic-radio-group',
		disabled,
	} = props;
	const onChange = useOnHandleChange({ handleChange, response, value });
	return (
		<WrappedRadioGroup
			declarations={declarations}
			missingResponse={missingResponse}
			description={description}
			handleChange={handleChange}
			id={id}
			options={options}
			value={value}
			onSelect={onChange}
			checkboxStyle={checkboxStyle}
			errors={errors}
			label={label}
			className={className}
			shortcut={shortcut}
			disabled={disabled}
		/>
	);
}

export default createCustomizableLunaticField(
	LunaticRadioGroup,
	'LunaticRadioGroup'
);
