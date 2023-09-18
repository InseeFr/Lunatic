import QuestionExplication from './html/question-explication';
import type { LunaticComponentProps } from '../type';
import LunaticComponent from '../commons/components/lunatic-component-without-label';

function empty() { }

function LunaticQuestionExplication({
    id,
    label,
    description,
    bgColor,
}: LunaticComponentProps<'QuestionExplication'>) {

    return (
        <LunaticComponent
            id={id}
            label={label}
            handleChange={empty}
            description={description}
            value={undefined}
        >
            <QuestionExplication label={label} id={id} description={description} bgColor={bgColor} />
        </LunaticComponent>
    );
}

export default LunaticQuestionExplication;