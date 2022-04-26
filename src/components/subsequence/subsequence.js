import React from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';

function Subsequence({ id, declarations, label }) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<div
				aria-label={`sequence-${id}`}
				className="sequence-lunatic"
				id={`sequence-${id}`}
			>
				{label}
			</div>
			<DeclarationsAfterText declarations={declarations} />
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

export default Subsequence;
