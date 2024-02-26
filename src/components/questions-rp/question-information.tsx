import { createCustomizableLunaticField } from '../commons';
import './question-information.scss';
import type { LunaticComponentProps } from '../type';

function Description({
	description,
}: LunaticComponentProps<'QuestionInformation'>) {
	if (!description) {
		return null;
	}
	return <span>{description}</span>;
}

function QuestionInformation(
	props: LunaticComponentProps<'QuestionInformation'>
) {
	const { label, description } = props;

	if (label) {
		return (
			<>
				<div className="lunatic-alert-information">
					{label}
					<Description description={description} />
				</div>
			</>
		);
	}
	return null;
}

export default createCustomizableLunaticField(
	QuestionInformation,
	'QuestionInformation'
);
