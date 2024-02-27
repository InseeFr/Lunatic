import { Declarations } from '../shared/Declarations/Declarations';
import type { LunaticComponentProps } from '../type';
import { customizedComponent } from '../shared/HOC/customizedComponent';

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

export const Subsequence = customizedComponent(
	'Subsequence',
	LunaticSubsequence
);
