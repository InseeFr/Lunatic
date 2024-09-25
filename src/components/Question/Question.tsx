import { LunaticComponents } from '../LunaticComponents';
import type { LunaticComponentProps } from '../type';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { Declarations } from '../shared/Declarations/Declarations';
import type { PropsWithChildren } from 'react';

/**
 * Surround a question giving additional context with label / description / declarations
 */
export const Question = (props: LunaticComponentProps<'Question'>) => {
	const { components, propsTransformer } = props;
	return (
		<CustomQuestion {...props}>
			<LunaticComponents
				components={components}
				componentProps={propsTransformer}
			/>
		</CustomQuestion>
	);
};

type CustomProps = PropsWithChildren<LunaticComponentProps<'Question'>>;

export const CustomQuestion = slottableComponent<CustomProps>(
	'Question',
	(props) => {
		const { id, description, declarations, label, children } = props;
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
				{children}
			</fieldset>
		);
	}
);
