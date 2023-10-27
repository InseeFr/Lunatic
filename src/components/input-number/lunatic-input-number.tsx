import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import { type LunaticComponentProps } from '../type';
import InputNumber from './html/input-number';

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
				max={max}
				decimals={decimals}
				unit={unit}
				required={required}
				errors={errors}
			/>
		</LunaticComponent>
	);
}

export default LunaticInputNumber;
