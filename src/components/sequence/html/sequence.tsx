import { createCustomizableLunaticField } from '../../commons';
import './sequence.scss';
import { LunaticBaseProps } from '../../type';

function Sequence({
	label,
	id,
	style,
}: Pick<LunaticBaseProps<string>, 'id' | 'label' | 'style'>) {
	return (
		<div className="sequence-lunatic" id={`sequence-${id}`} style={style}>
			{label}
		</div>
	);
}

export default createCustomizableLunaticField(Sequence, 'Sequence');
