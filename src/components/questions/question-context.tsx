import { createCustomizableLunaticField } from '../commons';
import type { LunaticComponentProps } from '../type';
import './question-context.scss';

function Description({ description }: LunaticComponentProps<'Question'>) {
  if (!description) {
    return null;
  }
  return <span>{description}</span>
}

function QuestionContext(props: LunaticComponentProps<'Question'>) {
  const { label, description } = props;

  if (label) {
    return <>
      <div className="lunatic-call-out">
        {label}
        <Description description={description} />
      </div>
    </>;
  }
  return null;
}

export default createCustomizableLunaticField(
  QuestionContext,
  'QuestionContext'
);
