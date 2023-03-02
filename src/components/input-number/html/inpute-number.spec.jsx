import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InputNumber from './input-number';
import { describe, vi, it, expect, beforeEach } from 'vitest';
describe('InputNumber', () => {
	const mockOnChange = vi.fn();

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it('renders without crashing', () => {
		const container = render(
			<InputNumber value="input" id="input" labelledBy="input" />
		);
		expect(screen.getByRole('spinbutton')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders label and input', () => {
		const labelText = 'Enter a number';
		const { container } = render(
			<InputNumber id="number" label={labelText} onChange={mockOnChange} />
		);

		const label = screen.getByText(labelText);
		const input = container.querySelector('input[type="number"]');

		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
	});

	it('renders with value', () => {
		const { getByRole } = render(
			<InputNumber id="number" value={10} onChange={mockOnChange} />
		);

		const input = getByRole('spinbutton');

		expect(input).toHaveValue(10);
	});

	// it('renders input element with correct props', () => {
	// 	const { getByRole } = render(
	// 		<InputNumber
	// 			id="input-number-test"
	// 			value={5}
	// 			disabled={true}
	// 			readOnly={true}
	// 			labelId="input-number-label"
	// 			min={1}
	// 			max={10}
	// 			step={1}
	// 		/>
	// 	);
	// 	const input = getByRole('spinbutton');
	// 	expect(input).toHaveAttribute('id', 'input-number-test');
	// 	expect(input).toHaveAttribute('disabled');
	// 	expect(input).toHaveAttribute('readonly');
	// 	expect(input).toHaveAttribute('labelledby', 'input-number-label');
	// 	expect(input).toHaveAttribute('min', '1');
	// 	expect(input).toHaveAttribute('max', '10');
	// 	expect(input).toHaveAttribute('step', '1');
	// 	expect(`${input.value}`).toEqual('5');
	// });

	it('calls onChange with parsed value', () => {
		const { container } = render(
			<InputNumber id="number" onChange={mockOnChange} />
		);

		const input = container.querySelector('input[type="number"]');
		fireEvent.change(input, { target: { value: '10' } });

		expect(mockOnChange).toHaveBeenCalledTimes(1);
		expect(mockOnChange).toHaveBeenCalledWith(10);
	});

	it('renders unit element if provided', () => {
		const { getByText } = render(
			<InputNumber
				id="input-number-test"
				value={5}
				label="Input Number"
				labelId="input-number-label"
				unit="kg"
			/>
		);
		const unit = getByText('kg');
		expect(unit).toBeInTheDocument();
	});

	it('calls onChange with new value when input value changes', () => {
		const handleChange = vi.fn();
		const { getByRole } = render(
			<InputNumber id="input-number-test" value={5} onChange={handleChange} />
		);
		const input = getByRole('spinbutton');
		fireEvent.change(input, { target: { value: '7' } });
		expect(handleChange).toHaveBeenCalledWith(7);
	});

	it('disables input when disabled prop is true', () => {
		const { container } = render(
			<InputNumber id="number" disabled onChange={mockOnChange} />
		);

		const input = container.querySelector('input[type="number"]');
		expect(input).toBeDisabled();
	});

	it('renders with unit', () => {
		const { container } = render(
			<InputNumber id="number" value={10} unit="kg" onChange={mockOnChange} />
		);

		const unit = container.querySelector('span');
		expect(unit).toHaveTextContent('kg');
	});
});
