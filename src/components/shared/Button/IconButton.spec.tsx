import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, describe, vi } from 'vitest';
import { IconButton } from './IconButton';

describe('Fab', () => {
	it('renders children', () => {
		render(<IconButton>Test Children</IconButton>);
		expect(screen.getByText('Test Children')).toBeInTheDocument();
	});

	it('renders title', () => {
		render(<IconButton title="Test Title">Test Children</IconButton>);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('title', 'Test Title');
		expect(button).toHaveAttribute('aria-label', 'Test Title');
	});

	it('calls onClick when clicked', async () => {
		const handleClick = vi.fn();
		render(<IconButton onClick={handleClick}>Test Children</IconButton>);
		const button = screen.getByRole('button');
		await userEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('calls onKeyDown when a key is pressed', async () => {
		const handleKeyDown = vi.fn();
		render(<IconButton onKeyDown={handleKeyDown}>Test Children</IconButton>);
		const button = screen.getByRole('button');
		await userEvent.type(button, '{enter}');
		expect(handleKeyDown).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is true', () => {
		render(<IconButton disabled={true}>Test Children</IconButton>);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('has custom className', () => {
		render(<IconButton className="test-class">Test Children</IconButton>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('test-class');
	});

	it('has custom tabIndex', () => {
		render(<IconButton tabIndex={1}>Test Children</IconButton>);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('tabIndex', '1');
	});

	it('has default props', () => {
		render(<IconButton />);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('title', 'Fab');
		expect(button).not.toBeDisabled();
	});
});
