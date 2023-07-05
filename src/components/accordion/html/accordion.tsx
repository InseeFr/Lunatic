import { useState, ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';
import './accordion.scss';
import { LunaticBaseProps } from '../../type';

function Accordion({
    label,
    description,
    bgColor,
}: Pick<LunaticBaseProps<string>, 'label' | 'description'> & { bgColor?: string }) {
    const [isActive, setIsActive] = useState(false);
    const defaultBgcolor = '#FFFFFF';

    return (
        <div className="accordion-item" style={{ backgroundColor: bgColor ? bgColor : defaultBgcolor }}>
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div>{label}</div>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && <div className="accordion-content">{description}</div>}
        </div>
    );
};

export default createCustomizableLunaticField(Accordion, 'Accordion');

