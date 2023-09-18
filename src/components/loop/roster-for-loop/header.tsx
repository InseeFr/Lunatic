import { type ReactNode } from 'react';
import { Tr, Th, Thead } from '../../commons/components/html-table';

type Props = {
	id?: string;
	header?: Array<{ label: ReactNode }>;
};

function Header({ header, id }: Props) {
	if (!Array.isArray(header)) {
		return null;
	}
	return (
		<Thead id={id}>
			<Tr id={id} row={0}>
				{header.map(function ({ label }, index) {
					return (
						<Th id={id} index={index} key={`${label}-${index}`}>
							{label}
						</Th>
					);
				})}
			</Tr>
		</Thead>
	);
}

export default Header;
