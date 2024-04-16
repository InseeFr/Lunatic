import type { LunaticComponentProps } from '../../type';
import { Th } from './Th';
import { Thead } from './Thead';
import { Tr } from './Tr';

export function TableHeader({
	header,
}: Pick<LunaticComponentProps<'Table'>, 'header'>) {
	if (!Array.isArray(header)) {
		return null;
	}
	const content = header.map(function ({ label, rowspan, colspan }, index) {
		return (
			<Th row={0} index={index} rowSpan={rowspan} colSpan={colspan} key={index}>
				{label}
			</Th>
		);
	});
	return (
		<Thead>
			<Tr row={0}>{content}</Tr>
		</Thead>
	);
}
