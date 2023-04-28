import React from 'react';
import { createCustomizableLunaticField } from '../../commons';
import './sequence.scss';

function Sequence({ label, id, style }) {
	return (
		<div className="sequence-lunatic" id={`sequence-${id}`} style={style}>
			{label}
		</div>
	);
}

export default createCustomizableLunaticField(Sequence, 'Sequence');
