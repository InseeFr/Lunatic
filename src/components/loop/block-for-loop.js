import React, { useState, useCallback, useEffect } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import BlockForLoopOrchestrator from './block-for-loop-ochestrator';

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
	loopDependencies,
}) {
	const [nbRows, setNbRows] = useState(1);

	useEffect(
		function () {
			if (lines) {
				const { min, max } = lines;

				if (min !== undefined && max !== undefined) {
					const minValue = executeExpression(min, {
						bindingDependencies: loopDependencies,
					});
					const maxValue = executeExpression(max, {
						bindingDependencies: loopDependencies,
					});
					if (minValue) {
						setNbRows(minValue);
					}
				}
			}
		},
		[lines]
	);
	// bindingDependencies

	const executeExpression_ = useCallback(
		function (expression) {
			return executeExpression(expression);
		},
		[executeExpression]
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
				<DeclarationsBeforeText
					declarations={declarations}
					executeExpression={executeExpression}
				/>
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
					executeExpression={executeExpression}
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
