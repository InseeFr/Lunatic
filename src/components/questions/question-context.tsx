import { createCustomizableLunaticField } from '../commons';
import { LunaticComponentProps } from '../type';
import './question-context.scss';
import { isValidElement } from 'react';

function Description({ description }: LunaticComponentProps<'Question'>) {
	if (!description || !isValidElement(description)) {
		return null;
	}
	return <span>{description}</span>;
}

function QuestionContext(props: LunaticComponentProps<'Question'>) {
	const { label, description } = props;

	if (label) {
		return (
			<>
				<div className="lunatic-call-out">
					{label}
					<Description description={description} />
				</div>
			</>
		);
	}
	return null;
}

export default createCustomizableLunaticField(
	QuestionContext,
	'QuestionContext'
);
