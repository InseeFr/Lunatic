import React, { useState, useCallback, useEffect } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import BlockForLoopOrchestrator from './block-for-loop-ochestrator';

function BlockForLoop({
	declarations,
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
	const [min, setMin] = useState(undefined);
	const [max, setMax] = useState(undefined);

	useEffect(
		function () {
			if (lines) {
				const { min, max } = lines;

				if (min !== undefined && max !== undefined) {
					setMin(min);
					setMax(max);
				}
			}
		},
		[lines]
	);

	useEffect(
		function () {
			if (min && max) {
				setNbRows(min);
			}
		},
		[min, max]
	);

	const handleChangeLoop = useCallback(
		function (response, value, args) {
			handleChange(response, value, { ...args, loop: true, length: nbRows });
		},
		[handleChange, nbRows]
	);

	if (lines) {
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} />
				<DeclarationsAfterText declarations={declarations} />
				<BlockForLoopOrchestrator
					components={components}
					handleChange={handleChangeLoop}
					nbRows={nbRows}
					valueMap={valueMap}
					management={management}
					missing={missing}
					shortcut={shortcut}
					executeExpression={executeExpression}
				/>
				<DeclarationsDetachable declarations={declarations} />
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
