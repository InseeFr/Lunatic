import { render, screen } from '@testing-library/react';
import Thead from './thead';
import { expect, describe, it } from 'vitest';

describe('Thead', () => {
	it('renders with the correct ID', () => {
		const props = { id: 'test' };
		render(<Thead {...props} />);
		expect(screen.getByRole('rowgroup')).toHaveAttribute(
			'id',
			'lunatic-table-thead-test'
		);
	});

	it('renders with the correct class name', () => {
		const props = { id: 'test', className: 'test' };
		render(<Thead {...props} />);
		expect(screen.getByRole('rowgroup')).toHaveClass(
			'lunatic-table-thead test'
		);
	});
});
