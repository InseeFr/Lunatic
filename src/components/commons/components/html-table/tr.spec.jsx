import React from 'react';
import { render, screen } from '@testing-library/react';
import Tr from './tr';
import { expect, describe, it } from 'vitest';

describe('Tr', () => {
	it('renders a table row with the correct id and class name', () => {
		render(
			<table>
				<tbody>
					<Tr id="1" row={1} className="highlighted-row" />
				</tbody>
			</table>
		);
		const tr = screen.getByRole('row');
		expect(tr).toHaveAttribute('id', 'lunatic-table-tr-1-1');
		expect(tr).toHaveClass('lunatic-table-tr', 'highlighted-row');
	});

	it('renders the children components', () => {
		render(
			<Tr id="1" row={1}>
				<td id="1" row={1} index={1}>
					Cell 1,1
				</td>
				<td id="1" row={1} index={2}>
					Cell 1,2
				</td>
			</Tr>
		);
		const cell1 = screen.getByText('Cell 1,1');
		const cell2 = screen.getByText('Cell 1,2');
		expect(cell1).toBeInTheDocument();
		expect(cell2).toBeInTheDocument();
	});
});
