import { render } from '@testing-library/react';
import { Td } from './Td';
import { describe, expect, it } from 'vitest';

describe('Td', () => {
	it('renders a td element with the correct props and children', () => {
		const row = 1;
		const index = 2;
		const className = 'test-class';
		const colSpan = 2;
		const rowSpan = 3;
		const children = 'Test content';
		const { getByRole } = render(
			<table>
				<tbody>
					<tr>
						<Td
							id="a"
							row={row}
							index={index}
							className={className}
							colSpan={colSpan}
							rowSpan={rowSpan}
						>
							{children}
						</Td>
					</tr>
				</tbody>
			</table>
		);
		const td = getByRole('cell', { name: children });
		expect(td).toHaveClass('lunatic-table-td');
		expect(td).toHaveClass(className);
		expect(td).toHaveAttribute('colspan', colSpan.toString());
		expect(td).toHaveAttribute('rowspan', rowSpan.toString());
	});
});
