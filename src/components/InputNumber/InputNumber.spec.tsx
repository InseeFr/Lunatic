import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InputNumber } from './InputNumber';

describe('InputNumber', () => {
	const mockOnChange = vi.fn();

	const baseProps = {
		handleChange: mockOnChange,
		response: { name: 'demo' },
		value: 10,
		id: 'number',
		'aria-labelledby': 'input',
	};

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it('renders without crashing', () => {
		const { container } = render(<InputNumber {...baseProps} />);
		expect(container).toMatchSnapshot();
	});

	it('renders label and input', () => {
		const labelText = 'Enter a number';
		const { container } = render(
			<InputNumber
				{...baseProps}
				label={labelText}
				handleChange={mockOnChange}
			/>
		);

		const label = screen.getByText(labelText);
		const input = container.querySelector('input[type="text"]');

		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
	});

	it('renders with value', () => {
		const { container } = render(<InputNumber {...baseProps} />);

		const input = container.querySelector('input[type="text"]');

		expect(input).toHaveValue('10');
	});

	it('renders with big value', () => {
		const { container } = render(
			<InputNumber {...baseProps} value={10000.45} decimals={2} />
		);

		const input = container.querySelector('input[type="text"]');

		expect(input).toHaveValue('10,000.45');
	});

	it('calls onChange with parsed value', () => {
		const { container } = render(<InputNumber {...baseProps} id="number" />);

		const input = container.querySelector('input[type="text"]')!;
		fireEvent.change(input, { target: { value: '12' } });

		expect(mockOnChange).toHaveBeenCalledTimes(1);
		expect(mockOnChange).toHaveBeenCalledWith(baseProps.response, 12);
	});

	it('renders unit element if provided', () => {
		const { getByText } = render(
			<InputNumber
				{...baseProps}
				id="input-number-test"
				value={5}
				label="Input Number"
				unit="kg"
			/>
		);
		const unit = getByText('kg');
		expect(unit).toBeInTheDocument();
	});

	it('disables input when disabled prop is true', () => {
		const { container } = render(<InputNumber {...baseProps} disabled />);

		const input = container.querySelector('input[type="text"]');
		expect(input).toBeDisabled();
	});

	it('should handle readOnly', () => {
		const { container } = render(
			<InputNumber {...baseProps} value={123} readOnly />
		);
		expect(container).toMatchSnapshot();

		const input = container.querySelector('input[type="text"]');
		expect(input).toHaveAttribute('readonly');
		(input as HTMLElement).focus();
		expect(input).toHaveFocus();
		expect(input).toHaveValue('123');
	});

	it('renders with unit', () => {
		const { container } = render(<InputNumber {...baseProps} unit="kg" />);

		const unit = container.querySelector('span');
		expect(unit).toHaveTextContent('kg');
	});
});
