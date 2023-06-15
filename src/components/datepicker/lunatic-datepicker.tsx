import Datepicker from './html/datepicker';
import { createCustomizableLunaticField } from '../commons';
import useOnHandleChange from '../commons/use-on-handle-change';
import { LunaticComponentProps } from '../type';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const WrappedDatepicker = wrapWithDeclarations(Datepicker);

const LunaticDatepicker = (props: LunaticComponentProps<'Datepicker'>) => {
	const {
		id,
		errors,
		handleChange,
		response,
		value,
		disabled,
		readOnly,
		min,
		max,
		label,
		description,
		declarations,
		missingResponse,
	} = props;

	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<WrappedDatepicker
			declarations={declarations}
			missingResponse={missingResponse}
			description={description}
			handleChange={handleChange}
			disabled={disabled}
			readOnly={readOnly}
			value={value ?? ''}
			onChange={onChange}
			id={id}
			min={min}
			max={max}
			label={label}
			errors={errors}
		/>
	);
};

export default createCustomizableLunaticField(
	LunaticDatepicker,
	'LunaticDatepicker'
);
