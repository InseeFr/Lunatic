import { type ReactNode } from 'react';
import { Thead, Tr, Th } from '../commons/components/html-table';

type Props = {
	id?: string;
	header?: Array<{ label?: ReactNode; colspan?: number; rowspan?: number }>;
};

export function TableHeader({ id, header }: Props) {
	if (!Array.isArray(header)) {
		return null;
	}
	const content = header.map(function ({ label, rowspan, colspan }, index) {
		return (
			<Th
				id={id}
				row={0}
				index={index}
				rowSpan={rowspan}
				colSpan={colspan}
				key={index}
			>
				{label}
			</Th>
		);
	});
	return (
		<Thead id={id}>
			<Tr id={id} row={0}>
				{content}
			</Tr>
		</Thead>
	);
}
