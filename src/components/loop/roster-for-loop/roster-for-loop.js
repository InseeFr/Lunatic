import React, { useEffect, useState } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import RosterTable from './roster-table';
import * as lunatic from 'components';

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
	const min = lines?.min || 1;
	const [init, setInit] = useState(false);
	const [nbRows, setNbRows] = useState(-1);

	useEffect(function () {}, [components]);

	useEffect(
		function () {
			if (!init && valueMap) {
				setNbRows(getTableLength(valueMap));
				setInit(true);
			}
		},
		[init, valueMap]
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
			</>
		);
	}
	return null;
}

export default RosterforLoop;
