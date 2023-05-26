import { MessageType } from './type';
import { createCustomizableLunaticField } from '../commons';
import './question-context.scss';

function QuestionContent(props: MessageType) {
	const { text } = props;
	if (text) {
		return <div className="lunatic-call-out">{text}</div>;
	}
	return null;
}

export default createCustomizableLunaticField(
	QuestionContent,
	'QuestionContent'
);
