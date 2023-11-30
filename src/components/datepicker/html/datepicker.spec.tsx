import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Datepicker from './datepicker';

describe('Datepicker', () => {
	const mockOnChange = vi.fn();

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	['YYYY-MM-DD', 'YYYY-MM', 'YYYY'].forEach((format) => {
		it('should render properly with format ' + format, () => {
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
	});

	it('handle change correctly for format YYYY-MM-DD', () => {
		render(
			<Datepicker
				value={'1999-01-01'}
				id="datepicker"
				aria-labelledby="datepicker"
				onChange={mockOnChange}
			/>
		);
		fireEvent.change(screen.getByLabelText(/Année/), {
			target: { valueAsNumber: 2023 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith('2023-01-01');
		fireEvent.change(screen.getByLabelText(/Mois/), {
			target: { valueAsNumber: 2 },
		});
		fireEvent.change(screen.getByLabelText(/Jour/), {
			target: { valueAsNumber: 30 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith(null);
	});

	it('handle change correctly for format YYYY-MM', () => {
		render(
			<Datepicker
				dateFormat="YYYY-MM"
				value="1999-01"
				id="datepicker"
				aria-labelledby="datepicker"
				onChange={mockOnChange}
			/>
		);
		fireEvent.change(screen.getByLabelText(/Année/), {
			target: { valueAsNumber: 2023 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith('2023-01');
		fireEvent.change(screen.getByLabelText(/Mois/), {
			target: { valueAsNumber: 10 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith('2023-10');
	});

	it('handle change correctly for year YYYY', () => {
		render(
			<Datepicker
				dateFormat="YYYY"
				value="1999"
				id="datepicker"
				aria-labelledby="datepicker"
				onChange={mockOnChange}
			/>
		);
		fireEvent.change(screen.getByLabelText(/Année/), {
			target: { valueAsNumber: 2023 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith('2023');
	});
});
