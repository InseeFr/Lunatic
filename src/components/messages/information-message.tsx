import { MessageType } from './type';
import { createCustomizableLunaticField } from '../commons';
import './information-message.scss';

function InformationMessage(props: MessageType) {
	const { text } = props;
	if (text) {
		return <div className="lunatic-information-message">{text}</div>;
	}
	return null;
}

export default createCustomizableLunaticField(
	InformationMessage,
	'InformationMessage'
);
