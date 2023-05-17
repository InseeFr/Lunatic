import { render } from '@testing-library/react';
import { LunaticTable as Table } from './table';
import { expect, it, describe } from 'vitest';

describe('Table', () => {
	it('renders without crashing', () => {
		const { getByRole } = render(<Table id="test-table" />);
		expect(getByRole('table')).toBeInTheDocument();
	});

	it('applies custom className when provided', () => {
		const { getByRole } = render(
			<Table id="test-table" className="custom-class" />
		);
		expect(getByRole('table')).toHaveClass('custom-class');
	});
});
