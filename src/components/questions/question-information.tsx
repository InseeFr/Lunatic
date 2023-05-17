import { MessageType } from './type';
import { createCustomizableLunaticField } from '../commons';
import './question-information.scss';

function QuestionInformation(props: MessageType) {
	const { text } = props;
	if (text) {
		return <div className="lunatic-alert-information">{text}</div>;
	}
	return null;
}

export default createCustomizableLunaticField(
	QuestionInformation,
	'QuestionInformation'
);
