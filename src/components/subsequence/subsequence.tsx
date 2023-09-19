import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import { createCustomizableLunaticField } from '../commons';
import type { LunaticComponentProps } from '../type';

function Subsequence({
	id,
	declarations,
	label,
}: LunaticComponentProps<'Subsequence'>) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<div
				aria-label={`subsequence-${id}`}
				className="subsequence-lunatic"
				id={`subsequence-${id}`}
			>
				{label}
			</div>
			<DeclarationsAfterText declarations={declarations} id={id} />
			<DeclarationsDetachable declarations={declarations} id={id} />
		</>
	);
}

export default createCustomizableLunaticField(Subsequence, 'Subsequence');
