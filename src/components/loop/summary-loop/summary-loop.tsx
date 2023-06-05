import React, { } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import { createCustomizableLunaticField } from '../../commons';
import { LunaticComponentProps } from '../../type';

function SummaryLoop({
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
	errors,
}: LunaticComponentProps<'SummaryLoop'>) {
  
		return (
			<>
				{/* <DeclarationsBeforeText declarations={declarations} id={id} />
				<DeclarationsAfterText declarations={declarations} id={id} /> */}
				Toto
				{/* <DeclarationsDetachable declarations={declarations} id={id} /> */}
			</>
		);
	}


export default createCustomizableLunaticField(SummaryLoop, 'SummaryLoop');
