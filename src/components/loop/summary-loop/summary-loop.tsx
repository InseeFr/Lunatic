import React, { } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import { createCustomizableLunaticField } from '../../commons';
import { LunaticComponentProps } from '../../type';
import SummaryList from './summary-list';


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
  iterations
}: LunaticComponentProps<'SummaryLoop'>) {
  console.log(declarations)
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} id={id} />
				<DeclarationsAfterText declarations={declarations} id={id} />
				<SummaryList 
          label={label}
          executeExpression={executeExpression}
          id={id}
          components={components}
          iterations={iterations}
        />
				<DeclarationsDetachable declarations={declarations} id={id} />
			</>
		);
	}


export default createCustomizableLunaticField(SummaryLoop, 'SummaryLoop');
