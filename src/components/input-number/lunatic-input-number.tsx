import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import { type LunaticComponentProps } from '../type';
import InputNumber from './html/input-number';
import { getComponentErrors } from '../commons/components/errors/errors';

function LunaticInputNumber(props: LunaticComponentProps<'InputNumber'>) {
	const {
		id,
		value,
		handleChange,
		response,
		errors,
		declarations,
		preferences,
		label,
		disabled,
		missing,
		missingResponse,
		management,
		min,
		max,
		decimals,
		unit,
		description,
		required,
		readOnly,
	} = props;

	const onChange = useOnHandleChange({ handleChange, response, value });

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
			<InputNumber
				onChange={onChange}
				id={id}
				value={value}
				label={label}
				disabled={disabled}
				readOnly={readOnly}
				min={min}
				max={max}
				decimals={decimals}
				unit={unit}
				required={required}
				errors={getComponentErrors(errors, id)}
			/>
		</LunaticComponent>
	);
}

export default LunaticInputNumber;
