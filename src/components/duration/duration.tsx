import './duration.scss';
import { useOnHandleChange } from '../commons';
import { LunaticComponentProps } from '../type';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import DurationPTnHnM from './DurationPTnHnM';
import DurationPnYnM from './DurationPnYnM';

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
			<div className="container">
				{label}
				{format === 'PTnHnM' && (
					<DurationPTnHnM value={value} format={format} onChange={onChange} />
				)}
				{format === 'PnYnM' && (
					<DurationPnYnM value={value} format={format} onChange={onChange} />
				)}
			</div>
		</LunaticComponent>
	);
}

export default Duration;
