import { LunaticComponentProps } from '../type';
import Row from './row';

type Props = Pick<
	LunaticComponentProps<'Table'>,
	'body' | 'id' | 'executeExpression' | 'value' | 'handleChange' | 'iteration'
>;
function TableOrchestrator({
	body,
	id,
	executeExpression,
	value: valueMap,
	handleChange,
	iteration,
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
					/>
				);
			})}
		</>
	);
}

export default TableOrchestrator;
