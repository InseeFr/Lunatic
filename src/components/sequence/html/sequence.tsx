import { createCustomizableLunaticField } from '../../commons';
import './sequence.scss';
import { LunaticBaseProps } from '../../type';
import Description from '../../commons/components/description';

type Props = Pick<LunaticBaseProps<string>, 'id' | 'label' | 'style' | 'description'>

function Sequence({
	label,
	id,
	style,
	description,
}: Props ) {
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
