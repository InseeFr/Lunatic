import { BlockForLoop } from './block-for-loop';
import { RosterForLoop } from './roster-for-loop/roster-for-loop';
import type { LunaticComponentProps } from '../type';

const LoopTypes = {
	rosterForLoop: 'RosterForLoop',
	blockForLoop: 'Loop',
};

export function Loop(props: LunaticComponentProps<'Loop' | 'RosterForLoop'>) {
	const Component = getComponent(props.componentType);
	if (!Component) {
		return null;
	}
	return <Component {...(props as any)} />;
}

function getComponent(componentType?: string) {
	switch (componentType) {
		case LoopTypes.blockForLoop:
			return BlockForLoop;
		case LoopTypes.rosterForLoop:
			return RosterForLoop;
		default:
			return null;
	}
}
