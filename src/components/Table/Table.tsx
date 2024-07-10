import type { LunaticComponentProps } from '../type';
import { LunaticComponents } from '../LunaticComponents';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { Label } from '../shared/Label/Label';
import {
	Td,
	Tbody,
	Tr,
	TableHeader,
	Table as BaseTable,
} from '../shared/Table';
import type { PropsWithChildren } from 'react';

export function Table(props: LunaticComponentProps<'Table'>) {
	const { id, body, header, errors, declarations, label } = props;

	return (
		<BaseTable
			id={id}
			errors={getComponentErrors(errors, id)}
			declarations={declarations}
			label={label}
		>
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
							wrapper={({ colspan, rowspan, ...props }) => (
								<Td
									row={rowIndex}
									colSpan={colspan}
									rowSpan={rowspan}
									{...props}
								/>
							)}
						/>
					</Tr>
				))}
			</Tbody>
		</BaseTable>
	);
}
