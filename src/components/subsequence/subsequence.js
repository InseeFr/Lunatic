import React from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import { createCustomizableLunaticField } from '../commons';

function Subsequence({ id, declarations, label }) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<div
				aria-label={`subsequence-${id}`}
				className="subsequence-lunatic"
				id={`subsequence-${id}`}
			>
				{label}
			</div>
			<DeclarationsAfterText declarations={declarations} id={id} />
			<DeclarationsDetachable declarations={declarations} id={id} />
		</>
	);
}

export default createCustomizableLunaticField(Subsequence);
