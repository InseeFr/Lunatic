import React, { ReactNode } from 'react';
import {
	Thead as HtmlThead,
	Tr as HtmlTr,
	Th as HtmlTh,
} from '../commons/components/html-table';

type Props = {
	id?: string;
	header?: Array<{ label?: ReactNode; colspan?: number; rowspan?: number }>;
};

function Header({ id, header }: Props) {
	if (!Array.isArray(header)) {
		return null;
	}
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

export default Header;
