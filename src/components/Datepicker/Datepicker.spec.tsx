import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Datepicker } from './Datepicker';

describe('Datepicker', () => {
	const mockOnChange = vi.fn();
	const baseProps = {
		value: '1999-01-01',
		executeExpression: vi.fn,
		response: { name: 'demo' },
		'aria-labelledby': 'datepicker',
		id: 'datepicker',
	};

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	(['YYYY-MM-DD', 'YYYY-MM', 'YYYY'] as const).forEach((format) => {
		it('should render properly with format ' + format, () => {
			const { container } = render(
				<Datepicker
					{...baseProps}
					handleChanges={mockOnChange}
					dateFormat={format}
				/>
			);
			expect(container).toMatchSnapshot();
		});
	});

	it('handle change correctly for format YYYY-MM-DD', () => {
		render(
			<Datepicker
				{...baseProps}
				dateFormat="YYYY-MM-DD"
				handleChanges={mockOnChange}
			/>
		);
		fireEvent.change(screen.getByLabelText(/Année/), {
			target: { valueAsNumber: 2023 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith([
			{
				...baseProps.response,
				value: '2023-01-01',
			},
		]);
		fireEvent.change(screen.getByLabelText(/Mois/), {
			target: { valueAsNumber: 2 },
		});
		fireEvent.change(screen.getByLabelText(/Jour/), {
			target: { valueAsNumber: 30 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith([
			{ ...baseProps.response, value: null },
		]);
	});

	it('handle change correctly for format YYYY-MM', () => {
		render(
			<Datepicker
				{...baseProps}
				dateFormat="YYYY-MM"
				value="1999-01"
				handleChanges={mockOnChange}
			/>
		);
		fireEvent.change(screen.getByLabelText(/Année/), {
			target: { valueAsNumber: 2023 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith([
			{
				...baseProps.response,
				value: '2023-01',
			},
		]);
		fireEvent.change(screen.getByLabelText(/Mois/), {
			target: { valueAsNumber: 10 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith([
			{
				...baseProps.response,
				value: '2023-10',
			},
		]);
	});

	it('handle change correctly for year YYYY', () => {
		render(
			<Datepicker
				{...baseProps}
				dateFormat="YYYY"
				value="1999"
				handleChanges={mockOnChange}
			/>
		);
		fireEvent.change(screen.getByLabelText(/Année/), {
			target: { valueAsNumber: 2023 },
		});
		expect(mockOnChange).toHaveBeenLastCalledWith([
			{ ...baseProps.response, value: '2023' },
		]);
	});
});
