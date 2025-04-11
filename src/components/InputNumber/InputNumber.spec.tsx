import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InputNumber } from './InputNumber';

describe('InputNumber', () => {
	const mockOnChange = vi.fn();

	const baseProps = {
		handleChanges: mockOnChange,
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
				handleChanges={mockOnChange}
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
		expect(mockOnChange).toHaveBeenCalledWith([
			{
				...baseProps.response,
				value: 12,
			},
		]);
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

	it('should handle required', () => {
		const { container } = render(<InputNumber {...baseProps} required />);

		const input = container.querySelector('input[type="text"]');

		expect(input).toHaveAttribute('required');
		expect(input).toHaveAttribute('aria-required', 'true');
	});

	it('renders with unit', () => {
		const { container } = render(<InputNumber {...baseProps} unit="kg" />);

		const unit = container.querySelector('span');
		expect(unit).toHaveTextContent('kg');
	});

	it('should display input value from the start when user leave input', () => {
		const setSelectionRangeMock = vi.fn();
		const { container } = render(
			<InputNumber
				{...baseProps}
				value={100000000000000000000000000000000000}
			/>
		);

		const input = container.querySelector('input[type="text"]');

		fireEvent.blur(input!, {
			target: {
				...input,
				setSelectionRange: setSelectionRangeMock,
			},
		});
		expect(setSelectionRangeMock).toHaveBeenCalledWith(0, 0);
	});

	it('should have the proper title', async () => {
		const { getByTitle } = render(
			<InputNumber {...baseProps} value={100000} unit="€" />
		);
		expect(getByTitle((content) => content.includes('€'))).toBeInTheDocument();
	});

	it('should have the proper title when equal to 0', async () => {
		const { getByTitle } = render(
			<InputNumber {...baseProps} value={0} unit="€" />
		);
		expect(getByTitle('0 €')).toBeInTheDocument();
	});
});
