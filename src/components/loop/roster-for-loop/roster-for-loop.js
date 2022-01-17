import React, { useEffect, useState, useCallback } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import RosterTable from './roster-table';
import AddRowButton from './add-row-button';
import * as lunatic from 'components';

const DEFAULT_MAX_ROWS = 12;

function getTableLength(value) {
	return Object.entries(value).reduce(function (length, variable) {
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
				<DeclarationsBeforeText declarations={declarations} />
				<lunatic.Sequence label={label} />
				<DeclarationsAfterText declarations={declarations} />
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
				/>
				<DeclarationsDetachable declarations={declarations} />
				<AddRowButton onClick={addRow} disabled={disabled}>
					Add Row!
				</AddRowButton>
			</>
		);
	}
	return null;
}

export default RosterforLoop;
