import type { LunaticComponentProps } from '../type';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { LabelDescription } from '../shared/LabelDescription';
import { Declarations } from '../shared/Declarations/Declarations';

function LunaticSequence({
	label,
	id,
	style,
	description,
	declarations,
}: LunaticComponentProps<'Sequence'>) {
	return (
		<>
			<div className="sequence-lunatic" id={`sequence-${id}`} style={style}>
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

export const Sequence = slottableComponent('Sequence', LunaticSequence);
