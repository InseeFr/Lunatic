import LunaticComponent from '../commons/components/lunatic-component-without-label';
import Sequence from './html/sequence';

function LunaticSequence(props) {
	const {
		declarations,
		label,
		id,
		style,
		preferences,
		missing,
		missingResponse,
		management,
		description,
		informationMessage,
		contentMessage,
	} = props;
	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			declarations={declarations}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			informationMessage={informationMessage}
			contentMessage={contentMessage}
		>
			<Sequence id={id} label={label} style={style} />
		</LunaticComponent>
	);
}

export default LunaticSequence;
