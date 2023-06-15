import Sequence from './html/sequence';
import { LunaticComponentProps } from '../type';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const WrappedSequence = wrapWithDeclarations(Sequence);

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
		<WrappedSequence
			id={id}
			label={label}
			declarations={declarations}
			handleChange={empty}
			value={undefined}
			questionContext={questionContext}
			questionInformation={questionInformation}
			style={style}
		/>
	);
}

export default LunaticSequence;
