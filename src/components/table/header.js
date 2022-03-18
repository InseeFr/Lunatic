import React from 'react';
import {
	Table as HtmlTable,
	Tbody as HtmlTbody,
	Thead as HtmlThead,
	Tr as HtmlTr,
	Td as HtmlTd,
	Th as HtmlTh,
} from '../commons/components/html-table';
import Row from './row';

function Header({ cells, custom, id }) {
	if (Array.isArray(cells)) {
		const columns = cells.map(function (cols) {
			return <Row id={id} custom={custom} columns={columns} />;
		}, []);

		return (
			<HtmlThead id={id} custom={custom}>
				<HtmlTr id={id} custom={custom}>
					{columns}
				</HtmlTr>
			</HtmlThead>
		);
	}

	return null;
}

export default Header;
