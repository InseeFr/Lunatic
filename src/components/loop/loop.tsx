import BlockForLoop from './block-for-loop';
import RosterForLoop from './roster-for-loop';
import type { LunaticComponentProps } from '../type';

const LoopTypes = {
	rosterForLoop: 'RosterForLoop',
	blockForLoop: 'Loop',
};

function Loop(props: LunaticComponentProps<'Loop' | 'RosterForLoop'>) {
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
		componentType,
		headers,
		shortcut,
		management,
		missing,
		features,
		preferences,
		paginatedLoop,
		errors,
		disabled,
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
					value={value}
					management={management}
					executeExpression={executeExpression}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					paginatedLoop={paginatedLoop}
					errors={errors}
					disabled={disabled}
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
					value={value}
					management={management}
					executeExpression={executeExpression}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					headers={headers}
					errors={errors}
					disabled={disabled}
				/>
			);
		default:
			return null;
	}
}

export default Loop;
