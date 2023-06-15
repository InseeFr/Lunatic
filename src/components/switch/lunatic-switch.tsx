import Switch from './html/switch';
import useOnHandleChange from '../commons/use-on-handle-change';
import { LunaticComponentProps } from '../type';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const defaultLabel = { true: 'True', false: 'False' };

const WrappedSwitch = wrapWithDeclarations(Switch);

function LunaticSwitch({
	id,
	value,
	statusLabel = defaultLabel,
	handleChange,
	response,
	declarations,
	missingResponse,
	description,
	label,
	errors,
}: LunaticComponentProps<'Switch'>) {
	const booleanValue = value ?? false;

	const onClick = useOnHandleChange({ handleChange, response, value });

	return (
		<WrappedSwitch
			id={id}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			description={description}
			handleChange={handleChange}
			checked={booleanValue}
			onClick={onClick}
			statusLabel={statusLabel}
			label={label}
			errors={errors}
		/>
	);
}

export default LunaticSwitch;
