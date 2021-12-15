import React, { useState, useCallback } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import BlockForLoopOrchestrator from './block-for-loop-ochestrator';
import { Label } from '../commons';

function BlockForLoop({
	declarations,
	label,
	lines,
	components,
	handleChange,
	valueMap,
	missing,
	shortcut,
	management,
	executeExpression,
}) {
	const [nbRows, setNbRows] = useState(1);

	const handleChangeLoop = useCallback(
		function (response, value, args) {
			handleChange(response, value, { ...args, loop: true, length: nbRows });
		},
		[handleChange, nbRows]
	);

	if (lines) {
		return (
			<>
				<DeclarationsBeforeText
					declarations={declarations}
					executeExpression={executeExpression}
				/>
				<Label id={'id'} htmlFor={'todo'} className={'todo'}>
					{label}
				</Label>
				<DeclarationsAfterText
					declarations={declarations}
					executeExpression={executeExpression}
				/>
				<BlockForLoopOrchestrator
					components={components}
					handleChange={handleChangeLoop}
					nbRows={nbRows}
					valueMap={valueMap}
					management={management}
					missing={missing}
					shortcut={shortcut}
				/>
				<DeclarationsDetachable
					declarations={declarations}
					executeExpression={executeExpression}
				/>
			</>
		);
	}
	return null;
}

export default BlockForLoop;

// handleChange={handleChange}
// preferences={preferences}
// savingType={savingType}
// management={management}
// features={features}
// bindings={bindings}
// missing={missing}
// shortcut={shortcut}
