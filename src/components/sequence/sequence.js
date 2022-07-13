import React from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import './sequence.scss';

function Sequence({ declarations, label, id, style }) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<div className="sequence-lunatic" id={`sequence-${id}`} style={style}>
				{label}
			</div>
			<DeclarationsAfterText declarations={declarations} />
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

export default Sequence;
