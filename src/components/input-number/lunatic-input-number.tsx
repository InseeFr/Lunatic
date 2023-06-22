import useOnHandleChange from '../commons/use-on-handle-change';
import { LunaticComponentProps } from '../type';
import InputNumber from './html/input-number';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const WrappedInputNumber = wrapWithDeclarations(InputNumber);

function LunaticInputNumber(props: LunaticComponentProps<'InputNumber'>) {
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
		min,
		max,
		decimals,
		unit,
		required,
		readOnly,
		description,
	} = props;

	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<WrappedInputNumber
			declarations={declarations}
			missingResponse={missingResponse}
			handleChange={handleChange}
			onChange={onChange}
			id={id}
			value={value}
			label={label}
			disabled={disabled || readOnly}
			min={min}
			max={max}
			decimals={decimals}
			unit={unit}
			required={required}
			errors={errors}
			description={description}
		/>
	);
}

export default LunaticInputNumber;
