import Switch from './html/switch';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../commons/components/errors/errors';

const defaultLabel = { true: 'True', false: 'False' };

function LunaticSwitch({
	id,
	value,
	statusLabel = defaultLabel,
	handleChange,
	response,
	preferences,
	declarations,
	missing,
	missingResponse,
	management,
	description,
	label,
	errors,
	readOnly,
	disabled,
}: LunaticComponentProps<'Switch'>) {
	const booleanValue = value ?? false;

	const onClick = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticComponent
			disabled={readOnly || disabled}
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
			<Switch
				id={id}
				checked={booleanValue}
				onClick={onClick}
				statusLabel={statusLabel}
				label={label}
				errors={getComponentErrors(errors, id)}
				readOnly={readOnly}
				disabled={disabled}
			/>
		</LunaticComponent>
	);
}

export default LunaticSwitch;
