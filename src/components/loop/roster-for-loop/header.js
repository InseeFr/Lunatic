import React from 'react';
import { Tr, Th, Thead } from '../../commons/components/html-table';

function Header({ header, id, custom }) {
	if (Array.isArray(header)) {
		return (
			<Thead id={id} custom={custom}>
				<Tr id={id} custom={custom} row={0}>
					{header.map(function ({ label }, index) {
						return (
							<Th
								id={id}
								index={index}
								key={`${label}-${index}`}
								custom={custom}
							>
								{label}
							</Th>
						);
					})}
				</Tr>
			</Thead>
		);
	}
	return null;
}

export default Header;
