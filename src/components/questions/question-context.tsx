import { createCustomizableLunaticField } from '../commons';
import { LunaticComponentProps } from '../type';
import './question-context.scss';

function QuestionContent(props: LunaticComponentProps<'Question'>) {
	const { label } = props;
	if (label) {
		return <div className="lunatic-call-out">{label}</div>;
	}
	return null;
}

export default createCustomizableLunaticField(
	QuestionContent,
	'QuestionContent'
);
