import React, { useEffect } from 'react';
import {
	Table as HtmlTable,
	Tbody as HtmlTbody,
	Thead as HtmlThead,
	Tr as HtmlTr,
	Td as HtmlTd,
	Th as HtmlTh,
} from '../commons/components/html-table';

function Header({ custom, id }) {
	return (
		<HtmlThead id={id} custom={custom}>
			<HtmlTr id={id} custom={custom} row={0}>
				<HtmlTh id={id} custom={custom} row={0} index={0}>
					Not implemented yet!
				</HtmlTh>
			</HtmlTr>
		</HtmlThead>
	);
}

export default Header;
