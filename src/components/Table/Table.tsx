import type { LunaticComponentProps } from '../type';
import { LunaticComponents } from '../LunaticComponents';
import { ComponentErrors, getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { Label } from '../shared/Label/Label';
import {
	Td,
	Tbody,
	Tr,
	TableHeader,
	Table as BaseTable,
} from '../shared/Table';
import { Declarations } from '../shared/Declarations/Declarations';
import type { PropsWithChildren } from 'react';

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
			<BaseTable id={id} errors={getComponentErrors(errors, id)}>
				<TableHeader header={header} />
				<Tbody>
					{body.map((row, rowIndex) => (
						<Tr row={rowIndex} key={rowIndex}>
							<LunaticComponents<
								PropsWithChildren<{
									colspan?: number;
									rowspan?: number;
								}>
							>
								components={row}
								wrapper={({ children, index, colspan, rowspan }) => (
									<Td
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
		</>
	);
}
