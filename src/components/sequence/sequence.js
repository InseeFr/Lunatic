import React from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import { Label, safetyLabel } from '../commons';
import './sequence.scss';

function Sequence({ declarations, label, id, style }) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<Label className="sequence-lunatic" id={`sequence-${id}`} style={style}>
				{safetyLabel(label, id)}
			</Label>
			<DeclarationsAfterText declarations={declarations} />
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

export default Sequence;
