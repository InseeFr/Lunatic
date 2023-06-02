import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import InputNumber from './input-number';
describe('InputNumber', () => {
	const mockOnChange = vi.fn();

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it('renders without crashing', () => {
		const container = render(
			<InputNumber
				value={'input' as any as number}
				id="input"
				aria-labelledby="input"
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('renders label and input', () => {
		const labelText = 'Enter a number';
		const { container } = render(
			<InputNumber id="number" label={labelText} onChange={mockOnChange} />
		);

		const label = screen.getByText(labelText);
		const input = container.querySelector('input[type="text"]');

		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
	});

	it('renders with value', () => {
		const { container } = render(
			<InputNumber id="number" value={10} onChange={mockOnChange} />
		);

		const input = container.querySelector('input[type="text"]');

		expect(input).toHaveValue('10');
	});

	it('renders with big value', () => {
		const { container } = render(
			<InputNumber
				id="number"
				value={10000.45}
				decimals={2}
				onChange={mockOnChange}
			/>
		);

		const input = container.querySelector('input[type="text"]');

		expect(input).toHaveValue('10,000.45');
	});

	it('calls onChange with parsed value', () => {
		const { container } = render(
			<InputNumber id="number" onChange={mockOnChange} />
		);

		const input = container.querySelector('input[type="text"]')!;
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

	it('disables input when disabled prop is true', () => {
		const { container } = render(
			<InputNumber id="number" disabled onChange={mockOnChange} />
		);

		const input = container.querySelector('input[type="text"]');
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
