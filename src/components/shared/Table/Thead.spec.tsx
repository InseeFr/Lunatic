import { render, screen } from '@testing-library/react';
import { Thead } from './Thead';
import { expect, describe, it } from 'vitest';

describe('Thead', () => {
	it('renders with the correct class name', () => {
		const props = { className: 'test' };
		render(<Thead {...props} />);
		expect(screen.getByRole('rowgroup')).toHaveClass(
			'lunatic-table-thead test'
		);
	});
});
