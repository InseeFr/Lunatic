import React from 'react';
import THead from './html-table/thead';
import Tr from './html-table/tr';
import Th from './html-table/th';

function Header({ header, id }) {
	if (Array.isArray(header)) {
		return (
			<THead id={id}>
				<Tr id={`${id}`}>
					{header.map(function ({ label }, index) {
						return (
							<Th id={id} index={index} key={`${label}-${index}`}>
								{label}
							</Th>
						);
					})}
				</Tr>
			</THead>
		);
	}
	return null;
}

export default Header;
