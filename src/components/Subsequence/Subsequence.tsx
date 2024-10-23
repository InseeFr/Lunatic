import type { LunaticComponentProps } from '../type';
import { Declarations } from '../shared/Declarations/Declarations';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { LabelDescription } from '../shared/LabelDescription';

function LunaticSubsequence({
	id,
	label,
	description,
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
			<LabelDescription value={description} />
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
