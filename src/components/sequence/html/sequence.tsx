import { createCustomizableLunaticField } from '../../commons';
import './sequence.scss';
import { LunaticBaseProps } from '../../type';
import Description from '../../commons/components/description';

function Sequence({
	label,
	id,
	style,
	description,
}: Pick<LunaticBaseProps<string>, 'id' | 'label' | 'style' | 'description'>) {
	return (
		<>
			<div className="sequence-lunatic" id={`sequence-${id}`} style={style}>
				{label}
			</div>
			<Description value={description} />
		</>
	);
}

export default createCustomizableLunaticField(Sequence, 'Sequence');
