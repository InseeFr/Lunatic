import React, { ComponentProps } from 'react';
import BlockForLoop from './block-for-loop';
import RosterForLoop from './roster-for-loop';
import { LunaticComponentProps } from '../type';

const LoopTypes = {
	rosterForLoop: 'RosterForLoop',
	blockForLoop: 'Loop',
};

function Loop(props: LunaticComponentProps<'Loop' | 'RosterForLoop'>) {
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

export default Loop;
