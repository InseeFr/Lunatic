import Switch from './html/switch';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import type { LunaticComponentProps } from '../type';

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
}: LunaticComponentProps<'Switch'>) {
	const booleanValue = value ?? false;

	const onClick = useOnHandleChange({ handleChange, response, value });

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
			<Switch
				id={id}
				checked={booleanValue}
				onClick={onClick}
				statusLabel={statusLabel}
				label={label}
				errors={errors}
			/>
		</LunaticComponent>
	);
}

export default LunaticSwitch;
