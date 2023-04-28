import { MessageType } from './type';
// @ts-ignore
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
