import { render } from '@testing-library/react';
import { Th } from './Th';
import { expect, describe, it } from 'vitest';

describe('<Th />', () => {
	const props = {
		index: 1,
		colSpan: 2,
		rowSpan: 3,
		className: 'test-class',
		children: 'test children',
	};

	it('renders children', () => {
		const { getByRole } = render(
			<table>
				<tr>
					<Th {...props} />
				</tr>
			</table>
		);
		expect(getByRole('columnheader')).toHaveTextContent(props.children);
	});

	it('renders with correct attributes', () => {
		const { getByRole } = render(
			<table>
				<tr>
					<Th {...props} />
				</tr>
			</table>
		);
		const th = getByRole('columnheader');
		expect(th).toHaveAttribute('colSpan', props.colSpan.toString());
		expect(th).toHaveAttribute('rowSpan', props.rowSpan.toString());
		expect(th).toHaveClass(props.className);
	});
});
