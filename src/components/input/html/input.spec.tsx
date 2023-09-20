import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Input from './input';
describe('Input', () => {
	const mockOnChange = vi.fn();

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it('renders without crashing', () => {
		const { container } = render(
			<Input
				value={'input'}
				id="input"
				onChange={mockOnChange}
				errors={undefined}
				description="description"
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('renders label and input', () => {
		const labelText = 'Enter a number';
		const { container } = render(
			<Input
				id="number"
				label={labelText}
				onChange={mockOnChange}
				errors={undefined}
			/>
		);

		const label = screen.getByText(labelText);
		const input = container.querySelector('input[type="text"]');

		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
	});

	it('calls onChange with parsed value', () => {
		const { container } = render(
			<Input id="number" onChange={mockOnChange} errors={undefined} />
		);

		const input = container.querySelector('input[type="text"]')!;
		fireEvent.change(input, { target: { value: 'Dupont' } });

		expect(mockOnChange).toHaveBeenCalledTimes(1);
		expect(mockOnChange).toHaveBeenCalledWith('Dupont');
	});

	it('disables input when disabled prop is true', () => {
		const { container } = render(
			<Input id="number" disabled onChange={mockOnChange} errors={undefined} />
		);

		const input = container.querySelector('input[type="text"]');
		expect(input).toBeDisabled();
	});

	it('should handle readOnly', () => {
		const { container } = render(
			<Input
				id="number"
				value="toto"
				readOnly
				onChange={mockOnChange}
				errors={undefined}
			/>
		);
		expect(container).toMatchSnapshot();

		const input = container.querySelector('input[type="text"]');
		expect(input).toHaveAttribute('readonly');
		(input as HTMLElement).focus();
		expect(input).toHaveFocus();
		expect(input).toHaveValue('toto');
	});
});
