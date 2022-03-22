import React from 'react';
import {
	Thead as HtmlThead,
	Tr as HtmlTr,
	Th as HtmlTh,
} from '../../commons/components/html-table';

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
