import type { LunaticComponentProps } from '../type';
import { LunaticComponents } from '../LunaticComponents';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { Label } from '../shared/Label/Label';
import {
	Td,
	Tbody,
	Tr,
	TableHeader,
	Table as BaseTable,
} from '../shared/Table';
import { Declarations } from '../shared/Declarations/Declarations';

export function Table(props: LunaticComponentProps<'Table'>) {
	const { id, body, header, errors, label, declarations } = props;
	const labelId = `label-${id}`;

	return (
		<>
			<Label htmlFor={id} id={labelId}>
				{label}
			</Label>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			<BaseTable id={`table-${id}`}>
				<TableHeader id={id} header={header} />
				<Tbody>
					{body.map((row, rowIndex) => (
						<Tr id={id} row={rowIndex} key={rowIndex}>
							<LunaticComponents
								components={row}
								wrapper={({ children, index, colspan, rowspan }) => (
									<Td
										id={id}
										row={rowIndex}
										index={index}
										colSpan={colspan}
										rowSpan={rowspan}
									>
										{children}
									</Td>
								)}
							/>
						</Tr>
					))}
				</Tbody>
			</BaseTable>
			<ComponentErrors componentId={id} errors={errors} />
		</>
	);
}
