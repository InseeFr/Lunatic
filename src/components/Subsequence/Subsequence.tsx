import { Declarations } from '../shared/Declarations/Declarations';
import type { LunaticComponentProps } from '../type';
import { slottableComponent } from '../shared/HOC/slottableComponent';

function LunaticSubsequence({
	id,
	label,
	declarations,
}: LunaticComponentProps<'Subsequence'>) {
	return (
		<>
			<div
				aria-label={`subsequence-${id}`}
				className="subsequence-lunatic"
				id={`subsequence-${id}`}
			>
				{label}
			</div>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
		</>
	);
}

export const Subsequence = slottableComponent(
	'Subsequence',
	LunaticSubsequence
);
