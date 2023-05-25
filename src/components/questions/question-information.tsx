import { createCustomizableLunaticField } from '../commons';
import './question-information.scss';
import { LunaticComponentProps } from '../type';

function QuestionInformation(props: LunaticComponentProps<'Question'>) {
	const { label } = props;
	if (label) {
		return <div className="lunatic-alert-information">{label}</div>;
	}
	return null;
}

export default createCustomizableLunaticField(
	QuestionInformation,
	'QuestionInformation'
);
