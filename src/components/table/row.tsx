import React from 'react';
import { Tr as HtmlTr } from '../commons/components/html-table';
import Cell from './cell';
import type {
	LunaticComponentDefinition,
	LunaticExpression,
} from '../../use-lunatic/type';
import { LunaticBaseProps } from '../type';
type Props = {
	components: Array<
		| LunaticComponentDefinition
		| { label: LunaticExpression; rowspan?: number; colspan?: number }
	>;
	id: string;
	executeExpression: LunaticBaseProps['executeExpression'];
	iteration?: number;
	valueMap: Record<string, unknown>;
	rowIndex?: string | number;
	handleChange: LunaticBaseProps['handleChange'];
	errors?: LunaticBaseProps['errors'];
};
function Row({
	id,
	components,
	executeExpression,
	valueMap,
	rowIndex,
	iteration,
	handleChange,
	errors,
}: Props) {
	const row = components.map(function (content, index) {
		return (
			<Cell
				id={id}
				content={content}
				value={valueMap}
				executeExpression={executeExpression}
				handleChange={handleChange}
				iteration={iteration}
				row={rowIndex}
				index={index}
				key={index}
				errors={errors}
			/>
		);
	});
	return (
		<HtmlTr id={id} row={rowIndex}>
			{row}
		</HtmlTr>
	);
}

export default Row;
