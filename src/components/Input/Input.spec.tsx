import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Input } from './Input';
import { CharactersCount } from '../shared/CharactersCount/CharactersCount';

vi.mock('../shared/CharactersCount/CharactersCount', () => ({
	CharactersCount: vi.fn(),
}));

describe('Input', () => {
	const mockOnChange = vi.fn();
	const baseProps = {
		value: 'input',
		id: 'input',
		response: { name: 'demo' },
		handleChanges: mockOnChange,
	};

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it('renders without crashing', () => {
		const { container } = render(
			<Input {...baseProps} errors={undefined} description="description" />
		);
		expect(container).toMatchSnapshot();
	});

	it('renders label and input', () => {
		const labelText = 'Enter a number';
		const { container } = render(
			<Input {...baseProps} label={labelText} errors={undefined} />
		);

		const label = screen.getByText(labelText);
		const input = container.querySelector('input[type="text"]');

		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
	});

	it('calls CharactersCount component with correct props', () => {
		const props = { ...baseProps, maxLength: 30 };
		render(<Input {...props} />);
		expect(CharactersCount).toHaveBeenCalledWith(
			{
				id: props.id,
				maxLength: props.maxLength,
				value: props.value,
			},
			{}
		);
	});

	it('calls onChange with parsed value', () => {
		const { container } = render(<Input {...baseProps} errors={undefined} />);

		const input = container.querySelector('input[type="text"]')!;
		fireEvent.change(input, { target: { value: 'Dupont' } });

		expect(mockOnChange).toHaveBeenCalledTimes(1);
		expect(mockOnChange).toHaveBeenCalledWith([
			{ ...baseProps.response, value: 'Dupont' },
		]);
	});

	it('disables input when disabled prop is true', () => {
		const { container } = render(
			<Input {...baseProps} disabled errors={undefined} />
		);

		const input = container.querySelector('input[type="text"]');
		expect(input).toBeDisabled();
	});

	it('should handle readOnly', () => {
		const { container } = render(
			<Input
				{...baseProps}
				id="number"
				value="toto"
				readOnly
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

	it('should handle required', () => {
		const { container } = render(<Input {...baseProps} required />);

		const input = container.querySelector('input[type="text"]');

		expect(input).toHaveAttribute('required');
		expect(input).toHaveAttribute('aria-required', 'true');
	});

	it('should display input value from the start when user leave input', () => {
		const setSelectionRangeMock = vi.fn();
		const { container } = render(<Input {...baseProps} />);

		const input = container.querySelector('input[type="text"]');

		fireEvent.blur(input!, {
			target: {
				...input,
				setSelectionRange: setSelectionRangeMock,
			},
		});
		expect(setSelectionRangeMock).toHaveBeenCalledWith(0, 0);
	});
});
