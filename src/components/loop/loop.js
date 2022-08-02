import React from 'react';
import BlockForLoop from './block-for-loop';
import RosterForLoop from './roster-for-loop';

const LoopTypes = {
	rosterForLoop: 'RosterForLoop',
	blockForLoop: 'Loop',
};

function Loop(props) {
	const {
		declarations,
		label,
		lines,
		iterations,
		id,
		components,
		handleChange,
		value,
		executeExpression,
		loopDependencies,
		componentType,
		headers,
		shortcut,
		management,
		missing,
		features,
		preferences,
		custom,
		paginatedLoop,
	} = props;
	switch (componentType) {
		case LoopTypes.blockForLoop:
			return (
				<BlockForLoop
					declarations={declarations}
					label={label}
					lines={lines}
					iterations={iterations}
					id={id}
					components={components}
					handleChange={handleChange}
					valueMap={value}
					management={management}
					executeExpression={executeExpression}
					loopDependencies={loopDependencies}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					custom={custom}
					paginatedLoop={paginatedLoop}
				/>
			);
		case LoopTypes.rosterForLoop:
			return (
				<RosterForLoop
					declarations={declarations}
					label={label}
					lines={lines}
					iterations={iterations}
					id={id}
					components={components}
					handleChange={handleChange}
					valueMap={value}
					management={management}
					executeExpression={executeExpression}
					loopDependencies={loopDependencies}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					headers={headers}
					custom={custom}
				/>
			);
		default:
			return null;
	}
}

export default Loop;
