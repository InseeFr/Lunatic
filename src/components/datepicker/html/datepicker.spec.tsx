import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Datepicker from './datepicker';

describe('Datepicker', () => {
	const mockOnChange = vi.fn();

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it('renders without crashing', () => {
		const { container } = render(
			<Datepicker
				value={'1999-01-01'}
				id="datepicker"
				aria-labelledby="datepicker"
				onChange={mockOnChange}
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('should handle readOnly', () => {
		const { container } = render(
			<Datepicker
				id="Datepicker"
				value={'1980-01-19'}
				readOnly
				onChange={mockOnChange}
			/>
		);
		expect(container).toMatchSnapshot();

		const input = container.querySelector('input[type="date"]');
		expect(input).toHaveAttribute('readonly');
		(input as HTMLElement).focus();
		expect(input).toHaveFocus();
		expect(input).toHaveValue('1980-01-19');
	});
});
