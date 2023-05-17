import Sequence from './html/sequence';
import { LunaticComponentProps } from '../type';
import LunaticComponent from '../commons/components/lunatic-component-without-label';

function empty() {}

function LunaticSequence({
	declarations,
	label,
	id,
	style,
	questionContext,
	questionInformation,
}: LunaticComponentProps<'Sequence'>) {
	return (
		<LunaticComponent
			id={id}
			label={label}
			declarations={declarations}
			handleChange={empty}
			value={undefined}
			questionContext={questionContext}
			questionInformation={questionInformation}
		>
			<Sequence label={label} id={id} style={style} />
		</LunaticComponent>
	);
}

export default LunaticSequence;
