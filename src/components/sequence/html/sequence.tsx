import { createCustomizableLunaticField } from '../../commons';
import './sequence.scss';
import { LunaticBaseProps } from '../../type';
import { ReactNode } from 'react';

type Props = Pick<LunaticBaseProps<string>, 'id' | 'label' | 'style'> & {
	description?: ReactNode;
};

function Sequence({ label, id, style }: Props) {
	return (
		<div className="sequence-lunatic" id={`sequence-${id}`} style={style}>
			{label}
		</div>
	);
}

export default createCustomizableLunaticField(Sequence, 'Sequence');
