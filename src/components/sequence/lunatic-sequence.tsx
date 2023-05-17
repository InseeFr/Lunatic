import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import Sequence from './html/sequence';
import { LunaticComponentProps } from '../type';

function LunaticSequence({
	declarations,
	label,
	id,
	style,
}: LunaticComponentProps<'Sequence'>) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<Sequence label={label} id={id} style={style} />
			<DeclarationsAfterText declarations={declarations} id={id} />
			<DeclarationsDetachable declarations={declarations} id={id} />
		</>
	);
}

export default LunaticSequence;
