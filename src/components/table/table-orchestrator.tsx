import React from 'react';
import Row from './row';
import { LunaticBaseProps, LunaticComponentProps } from '../type';
type Props = {} & Pick<
	LunaticComponentProps<'Table'>,
	| 'body'
	| 'id'
	| 'executeExpression'
	| 'value'
	| 'handleChange'
	| 'iteration'
	| 'errors'
>;
function TableOrchestrator({
	body,
	id,
	executeExpression,
	value: valueMap,
	handleChange,
	iteration,
	errors,
}: Props) {
	if (!Array.isArray(body)) {
		return null;
	}
	return (
		<>
			{body.map(function (components, index) {
				return (
					<Row
						key={index}
						rowIndex={index}
						components={components}
						id={id}
						valueMap={valueMap}
						handleChange={handleChange}
						iteration={iteration}
						executeExpression={executeExpression}
						errors={errors}
					/>
				);
			})}
		</>
	);
}

export default TableOrchestrator;
