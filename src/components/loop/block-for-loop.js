import React, { useCallback, useState } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import LoopOrchestrator from './loop-ochestrator';
import { Label } from '../commons';

function BlockForLoop({
	declarations,
	label,
	lines,
	id,
	components,
	handleChange,
	valueMap,
}) {
	const handleChangeLoop = useCallback(function () {}, []);
	const [nbRows, setNbRows] = useState(1);

	if (lines) {
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} />
				<Label id={'id'} htmlFor={'todo'} className={'todo'}>
					{label}
				</Label>
				<DeclarationsAfterText declarations={declarations} />
				<LoopOrchestrator
					components={components}
					handleChange={handleChangeLoop}
					nbRows={nbRows}
					valueMap={valueMap}
				/>
				<DeclarationsDetachable declarations={declarations} />
			</>
		);
	}
	return null;
}

export default BlockForLoop;
