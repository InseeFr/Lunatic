import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Delete from './delete';

describe('Delete', () => {
	const onClickMock = vi.fn();
	const search = 'test';
	const className = 'test-class';

	afterEach(() => {
		onClickMock.mockClear();
	});

	it('should not render when editable is false', () => {
		render(<Delete editable={false} />);
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('should call onClick when clicked and search is not empty', () => {
		render(<Delete editable search={search} onClick={onClickMock} />);
		userEvent.click(screen.getByRole('button'));
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	it('should not call onClick when clicked and search is empty', () => {
		render(<Delete editable search="" onClick={onClickMock} />);
		userEvent.click(screen.getByRole('button'));
		expect(onClickMock).toHaveBeenCalledTimes(0);
	});

	it('should call onClick when the Enter key is pressed and search is not empty', () => {
		const search = 'test';
		const onClick = vi.fn();
		render(<Delete search={search} onClick={onClick} editable />);

		const deleteButton = screen.getByTitle('delete');
		fireEvent.keyDown(deleteButton, { key: 'Enter' });

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('should not call onClick when the Enter key is pressed and search is empty', () => {
		render(<Delete editable search="" onClick={onClickMock} />);
		userEvent.type(screen.getByRole('button'), '{Enter}');
		expect(onClickMock).toHaveBeenCalledTimes(0);
	});

	it('should apply the className prop', () => {
		render(
			<Delete
				className={className}
				editable
				search={search}
				onClick={onClickMock}
			/>
		);
		expect(screen.getByRole('button')).toHaveClass(className);
	});

	it('should be disabled when search is empty', () => {
		render(<Delete editable search="" onClick={onClickMock} />);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should not be disabled when search is not empty', () => {
		render(<Delete editable search={search} onClick={onClickMock} />);
		expect(screen.getByRole('button')).not.toBeDisabled();
	});
});
