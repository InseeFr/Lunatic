import React from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import LoopOrchestrator from './loop-ochestrator';
import { Label } from '../commons';

function BlockForLoop({ declarations, label, lines, id, components }) {
	if (lines) {
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} />
				<Label id={'id'} htmlFor={'todo'} className={'todo'}>
					{label}
				</Label>
				<DeclarationsAfterText declarations={declarations} />
				<LoopOrchestrator components={components} />
				<DeclarationsDetachable declarations={declarations} />
			</>
		);
	}
	return null;
}

export default BlockForLoop;
