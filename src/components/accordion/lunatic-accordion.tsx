import Accordion from './html/accordion';
import { LunaticComponentProps } from '../type';
import LunaticComponent from '../commons/components/lunatic-component-without-label';

function empty() { }

function LunaticAccordion({
    id,
    label,
    description,
}: LunaticComponentProps<'Accordion'>) {

    return (
        <LunaticComponent
            id={id}
            label={label}
            handleChange={empty}
            description={description}
            value={undefined}
        >
            <Accordion label={label} description={description} />
        </LunaticComponent>
    );
}

export default LunaticAccordion;