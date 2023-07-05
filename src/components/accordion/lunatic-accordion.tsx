import Accordion from './html/accordion';
import { LunaticComponentProps } from '../type';
import LunaticComponent from '../commons/components/lunatic-component-without-label';

function empty() { }

function LunaticAccordion({
    id,
    label,
    description,
    bgColor,
}: LunaticComponentProps<'Accordion'>) {

    return (
        <LunaticComponent
            id={id}
            label={label}
            handleChange={empty}
            description={description}
            value={undefined}
        >
            <Accordion label={label} description={description} bgColor={bgColor} />
        </LunaticComponent>
    );
}

export default LunaticAccordion;