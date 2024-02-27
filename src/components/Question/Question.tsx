import { LunaticComponents } from '../LunaticComponents';
import type { LunaticComponentProps } from '../type';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { Declarations } from '../shared/Declarations/Declarations';

/**
 * Surround a question giving additional context with label / description / declarations
 */
export const Question = customizedComponent(
	'Question',
	(props: LunaticComponentProps<'Question'>) => {
		const { id, description, declarations, label, components } = props;
		return (
			<fieldset>
				<legend id={`question-legend-${id}`}>
					<h3>{label}</h3>
					<p className="description-lunatic" id={`question-description-${id}`}>
						{description}
					</p>
				</legend>
				<Declarations
					type="AFTER_QUESTION_TEXT"
					declarations={declarations}
					id={id}
				/>
				<LunaticComponents
					components={components}
					wrapper={({ children }) => (
						<div className="question-components">{children}</div>
					)}
				/>
			</fieldset>
		);
	}
);
