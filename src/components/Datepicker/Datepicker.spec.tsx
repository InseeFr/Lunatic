import { fireEvent, render } from '@testing-library/react';
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
		it(`should render properly with format ${format}`, () => {
			const { container } = render(
				<Datepicker
					{...baseProps}
					handleChanges={mockOnChange}
					dateFormat={format}
				/>
			);
			const input = container.querySelector(`#${baseProps.id}`);
			expect(input).not.toBeNull();
			expect(container).toMatchSnapshot();
		});
	});

	it('handle change correctly for format YYYY-MM-DD', () => {
		const { container } = render(
			<Datepicker
				{...baseProps}
				dateFormat="YYYY-MM-DD"
				handleChanges={mockOnChange}
			/>
		);

		const input = container.querySelector(`#${baseProps.id}`);
		expect(input).toBeInTheDocument();

		if (input) {
			fireEvent.change(input, { target: { value: '01/01/2023' } });
			expect(mockOnChange).toHaveBeenLastCalledWith([
				{
					...baseProps.response,
					value: '2023-01-01',
				},
			]);
		}
	});

	it('handle change correctly for format YYYY-MM', () => {
		const { container } = render(
			<Datepicker
				{...baseProps}
				dateFormat="YYYY-MM"
				value="1999-01"
				handleChanges={mockOnChange}
			/>
		);

		const input = container.querySelector(`#${baseProps.id}`);
		expect(input).toBeInTheDocument();

		if (input) {
			fireEvent.change(input, {
				target: { value: '01/2023' },
			});
			expect(mockOnChange).toHaveBeenLastCalledWith([
				{
					...baseProps.response,
					value: '2023-01',
				},
			]);
		}
	});

	it('handle change correctly for year YYYY', () => {
		const { container } = render(
			<Datepicker
				{...baseProps}
				dateFormat="YYYY"
				value="1999"
				handleChanges={mockOnChange}
			/>
		);

		const input = container.querySelector(`#${baseProps.id}`);
		expect(input).toBeInTheDocument();

		if (input) {
			fireEvent.change(input, {
				target: { value: '2023' },
			});
			expect(mockOnChange).toHaveBeenLastCalledWith([
				{ ...baseProps.response, value: '2023' },
			]);
		}
	});
});
