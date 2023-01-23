import React from 'react';
import {
	Thead as HtmlThead,
	Tr as HtmlTr,
	Th as HtmlTh,
} from '../../commons/components/html-table';

function Header({ id, header }) {
	if (Array.isArray(header)) {
		const content = header.map(function ({ label, rowspan, colspan }, index) {
			return (
				<HtmlTh
					id={id}
					row={0}
					index={index}
					rowSpan={rowspan}
					colSpan={colspan}
					key={index}
				>
					{label}
				</HtmlTh>
			);
		});
		return (
			<HtmlThead id={id}>
				<HtmlTr id={id} row={0}>
					{content}
				</HtmlTr>
			</HtmlThead>
		);
	}
	return null;
}

export default Header;
