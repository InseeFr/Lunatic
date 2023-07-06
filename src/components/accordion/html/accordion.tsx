import { useState, ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';
import './accordion.scss';
import { LunaticBaseProps } from '../../type';

function Accordion({
    id,
    label,
    description,
    bgColor,
}: Pick<LunaticBaseProps<string>, 'id' | 'label' | 'description'> & { bgColor?: string }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <section className="accordion-item" style={bgColor ? { backgroundColor: bgColor } : {}}>
            <h3 className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <button className="accordion-trigger" aria-expanded={isActive}  aria-controls={`accordion-${id}`}>{label}</button>
                <span>{isActive ? '-' : '+'}</span>
            </h3>
            {isActive && <div className="accordion-content" id={`accordion-${id}`}>{description}</div>}
        </section>
    );
};

export default createCustomizableLunaticField(Accordion, 'Accordion');

