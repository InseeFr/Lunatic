import './duration.scss';
import { useOnHandleChange } from '../commons';
import type { LunaticComponentProps } from '../type';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import DurationInput from './durationInput';

function Duration(props: LunaticComponentProps<'Duration'>) {
	const {
		value,
		label,
		format,
		handleChange,
		response,
		id,
		preferences,
		declarations,
		missing,
		missingResponse,
		management,
		description,
	} = props;

	const onChange = useOnHandleChange({
		handleChange,
		response,
		value: value ?? '',
	});

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
			<DurationInput
				id={id}
				label={label}
				value={value}
				format={format}
				onChange={onChange}
			/>
		</LunaticComponent>
	);
}

export default Duration;
