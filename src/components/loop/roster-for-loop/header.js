import React from 'react';
import { Tr, Th, Thead } from '../../commons/components/html-table';

function Header({ header, id }) {
	if (Array.isArray(header)) {
		return (
			<Thead id={id}>
				<Tr id={`${id}`}>
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
	return null;
}

export default Header;
