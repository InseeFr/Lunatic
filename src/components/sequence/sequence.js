import React from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import './sequence.scss';
import { createCustomizableLunaticField } from '../commons';

function Sequence({ declarations, label, id, style }) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<div className="sequence-lunatic" id={`sequence-${id}`} style={style}>
				{label}
			</div>
			<DeclarationsAfterText declarations={declarations} id={id} />
			<DeclarationsDetachable declarations={declarations} id={id} />
		</>
	);
}

export default createCustomizableLunaticField(Sequence, 'Sequence');
