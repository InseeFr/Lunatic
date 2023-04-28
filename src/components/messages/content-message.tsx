import { MessageType } from './type';
// TODO comment faire en attendant de passer à ts ?
import { createCustomizableLunaticField } from '../commons';
import './content-message.scss';

function InformationMessage(props: MessageType) {
	const { text } = props;
	return <div className="lunatic-content-message">{text}</div>;
}

export default createCustomizableLunaticField(
	InformationMessage,
	'InformationMessage'
);
