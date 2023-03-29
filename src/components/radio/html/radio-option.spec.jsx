import { render, screen, fireEvent } from '@testing-library/react';
import RadioOption from './radio-option';
import { describe, it, expect, vi } from 'vitest';

describe('RadioOption', () => {
	it('renders the component with the correct label', () => {
		const label = 'Test Option';
		const { getByText } = render(<RadioOption label={label} />);
		expect(getByText(label)).toBeInTheDocument();
	});

	it('calls the onClick handler when clicked', () => {
		const onClickMock = vi.fn();
		render(<RadioOption label="Test Option" onClick={onClickMock} />);
		const option = screen.getByRole('radio');
		fireEvent.click(option);
		expect(onClickMock).toHaveBeenCalled();
	});

	it('sets the tabIndex to -1 when unchecked', () => {
		const { getByRole } = render(
			<RadioOption label="Test Option" checked={false} />
		);
		expect(getByRole('radio')).toHaveAttribute('tabIndex', '-1');
	});

	it('sets the tabIndex to 0 when checked', () => {
		const { getByRole } = render(
			<RadioOption label="Test Option" checked={true} />
		);
		expect(getByRole('radio')).toHaveAttribute('tabIndex', '0');
	});

	it('applies the disabled class when disabled prop is present', () => {
		const { getByRole } = render(
			<RadioOption label="Test Option" disabled={true} />
		);
		expect(getByRole('radio').parentNode).toHaveClass('disabled');
	});

	it('applies the checked class when checked prop is present', () => {
		const { getByRole } = render(
			<RadioOption label="Test Option" checked={true} />
		);
		expect(getByRole('radio').parentNode).toHaveClass('checked');
	});

	it('applies the code-modality class when codeModality prop is present', () => {
		const { getByText } = render(
			<RadioOption label="Test Option" codeModality="html" />
		);
		expect(getByText('HTML')).toHaveClass('code-modality');
	});

	it('calls the onKeyDown handler when a key is pressed', () => {
		const onKeyDownMock = vi.fn();
		render(<RadioOption label="Test Option" onKeyDown={onKeyDownMock} />);
		const option = screen.getByRole('radio');
		fireEvent.keyDown(option, { key: 'Enter', code: 'Enter' });
		expect(onKeyDownMock).toHaveBeenCalled();
	});
});
