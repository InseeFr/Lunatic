import Sequence from './html/sequence';
import { LunaticComponentProps } from '../type';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const WrappedSequence = wrapWithDeclarations(Sequence);

function empty() {}

function LunaticSequence({
	declarations,
	description,
	label,
	id,
	style,
}: LunaticComponentProps<'Sequence'>) {
	return (
		<WrappedSequence
			description={description}
			id={id}
			label={label}
			declarations={declarations}
			handleChange={empty}
			value={undefined}
			style={style}
		/>
	);
}

export default LunaticSequence;
