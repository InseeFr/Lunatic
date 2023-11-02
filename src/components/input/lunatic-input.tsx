import Input from './html/input';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../commons/components/errors/errors';

function LunaticInput(props: LunaticComponentProps<'Input'>) {
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
		description,
		required,
		maxLength,
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
			<Input
				id={id}
				value={value}
				onChange={onChange}
				label={label}
				disabled={disabled}
				errors={getComponentErrors(errors, id)}
				required={required}
				maxLength={maxLength}
				readOnly={readOnly}
			/>
		</LunaticComponent>
	);
}

export default LunaticInput;
