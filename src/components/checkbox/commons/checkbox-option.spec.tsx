import { render, fireEvent } from '@testing-library/react';
import CheckboxOption from './checkbox-option';
import { describe, it, expect, vi } from 'vitest';

describe('CheckboxOption', () => {
	const props = {
		id: 'checkbox',
		onClick: vi.fn(),
		checked: false,
		disabled: false,
		label: 'Option 1',
		description: 'This is option 1',
		codeModality: 'ctrl',
		shortcut: false,
	};
	const defaultProps = {
		id: 'test-checkbox',
		onClick: vi.fn(),
		label: 'Test checkbox',
	};

	it('renders the component correctly', () => {
		const { getByRole, getByText } = render(<CheckboxOption {...props} />);
		const checkbox = getByRole('checkbox');
		const label = getByText('Option 1');

		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
		expect(label).toBeInTheDocument();
	});
	it('renders the label text', () => {
		const { getByText } = render(<CheckboxOption {...defaultProps} />);
		expect(getByText(defaultProps.label)).toBeInTheDocument();
	});

	it('renders the component with the checked attribute', () => {
		const { getByRole } = render(<CheckboxOption {...props} checked={true} />);
		const checkbox = getByRole('checkbox');

		expect(checkbox).toBeChecked();
	});

	it('calls the onClick function when clicked', () => {
		const { getByRole } = render(<CheckboxOption {...props} />);
		const checkbox = getByRole('checkbox');

		fireEvent.click(checkbox);

		expect(props.onClick).toHaveBeenCalledTimes(1);
		expect(props.onClick).toHaveBeenCalledWith(true);
	});
	it('calls the onClick function when space key is pressed', () => {
		const { getByRole } = render(<CheckboxOption {...defaultProps} />);
		const checkbox = getByRole('checkbox');
		fireEvent.keyDown(checkbox, { code: 'Space' });
		expect(defaultProps.onClick).toHaveBeenCalledWith(true);
	});
});
