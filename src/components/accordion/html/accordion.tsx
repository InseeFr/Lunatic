import { useState, ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';
import './accordion.scss';
import { LunaticBaseProps } from '../../type';

function Accordion({
    label,
    description,
}: Pick<LunaticBaseProps<string>, 'label' | 'description'>) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div>{label}</div>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && <div className="accordion-content">{description}</div>}
        </div>
    );
};

export default createCustomizableLunaticField(Accordion, 'Accordion');

