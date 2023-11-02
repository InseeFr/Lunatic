import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, describe, vi } from 'vitest';
import Fab from './fab';

describe('Fab', () => {
	it('renders children', () => {
		render(<Fab>Test Children</Fab>);
		expect(screen.getByText('Test Children')).toBeInTheDocument();
	});

	it('renders title', () => {
		render(<Fab title="Test Title">Test Children</Fab>);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('title', 'Test Title');
		expect(button).toHaveAttribute('aria-label', 'Test Title');
	});

	it('calls onClick when clicked', async () => {
		const handleClick = vi.fn();
		render(<Fab onClick={handleClick}>Test Children</Fab>);
		const button = screen.getByRole('button');
		await userEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('calls onKeyDown when a key is pressed', async () => {
		const handleKeyDown = vi.fn();
		render(<Fab onKeyDown={handleKeyDown}>Test Children</Fab>);
		const button = screen.getByRole('button');
		await userEvent.type(button, '{enter}');
		expect(handleKeyDown).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is true', () => {
		render(<Fab disabled={true}>Test Children</Fab>);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('has custom className', () => {
		render(<Fab className="test-class">Test Children</Fab>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('test-class');
	});

	it('has custom tabIndex', () => {
		render(<Fab tabIndex={1}>Test Children</Fab>);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('tabIndex', '1');
	});

	it('has default props', () => {
		render(<Fab />);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('title', 'Fab');
		expect(button).not.toBeDisabled();
	});
});
