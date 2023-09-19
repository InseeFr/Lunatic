import Sequence from './html/sequence';
import type { LunaticComponentProps } from '../type';
import LunaticComponent from '../commons/components/lunatic-component-without-label';

function empty() {}

function LunaticSequence({
	declarations,
	label,
	id,
	style,
}: LunaticComponentProps<'Sequence'>) {
	return (
		<LunaticComponent
			id={id}
			label={label}
			declarations={declarations}
			handleChange={empty}
			value={undefined}
		>
			<Sequence label={label} id={id} style={style} />
		</LunaticComponent>
	);
}

export default LunaticSequence;
