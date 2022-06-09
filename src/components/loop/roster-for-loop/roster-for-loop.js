import React, { useEffect, useState, useCallback } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import RosterTable from './roster-table';
import AddRowButton from './add-row-button';

const DEFAULT_MAX_ROWS = 12;

function getTableLength(value) {
	return Object.values(value).reduce(function (length, variable) {
		if (Array.isArray(variable)) {
			return Math.max(length, variable.length);
		}
		return length;
	}, 1);
}

function RosterforLoop({
	valueMap,
	loopDependencies,
	lines,
	handleChange,
	declarations,
	label,
	components,
	executeExpression,
	headers,
	missing,
	shortcut,
	id,
	management,
	iteration,
	custom,
}) {
	const max = lines?.max || DEFAULT_MAX_ROWS;
	const [init, setInit] = useState(false);
	const [nbRows, setNbRows] = useState(-1);

	useEffect(
		function () {
			if (!init && valueMap) {
				setNbRows(getTableLength(valueMap));
				setInit(true);
			}
		},
		[init, valueMap]
	);

	const disabled = nbRows === max;

	const addRow = useCallback(
		function () {
			if (nbRows < max) {
				setNbRows(nbRows + 1);
			}
		},
		[max, nbRows]
	);

	if (nbRows > 0) {
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} custom={custom} />
				<DeclarationsAfterText declarations={declarations} custom={custom} />
				<RosterTable
					id={id}
					components={components}
					nbRows={nbRows}
					executeExpression={executeExpression}
					header={headers}
					handleChange={handleChange}
					valueMap={valueMap}
					management={management}
					missing={missing}
					shortcut={shortcut}
					custom={custom}
				/>
				<DeclarationsDetachable declarations={declarations} custom={custom} />
				<AddRowButton onClick={addRow} disabled={disabled} custom={custom}>
					{label || 'Add Row!'}
				</AddRowButton>
			</>
		);
	}
	return null;
}

export default RosterforLoop;
