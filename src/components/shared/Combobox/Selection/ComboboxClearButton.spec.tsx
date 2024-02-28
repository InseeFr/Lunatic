import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ComboboxClearButton } from './ComboboxClearButton';

describe('Delete', () => {
	const onClickMock = vi.fn();
	const search = 'test';
	const className = 'test-class';

	afterEach(() => {
		onClickMock.mockClear();
	});

	it('should not render when editable is false', () => {
		render(<ComboboxClearButton editable={false} />);
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('should call onClick when clicked and search is not empty', async () => {
		render(
			<ComboboxClearButton editable search={search} onClick={onClickMock} />
		);
		await userEvent.click(screen.getByRole('button'));
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	it('should not call onClick when clicked and search is empty', async () => {
		render(<ComboboxClearButton editable search="" onClick={onClickMock} />);
		await userEvent.click(screen.getByRole('button'));
		expect(onClickMock).toHaveBeenCalledTimes(0);
	});

	it('should call onClick when the Enter key is pressed and search is not empty', () => {
		const search = 'test';
		const onClick = vi.fn();
		render(<ComboboxClearButton search={search} onClick={onClick} editable />);

		const deleteButton = screen.getByTitle('delete');
		fireEvent.keyDown(deleteButton, { key: 'Enter' });

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('should not call onClick when the Enter key is pressed and search is empty', async () => {
		render(<ComboboxClearButton editable search="" onClick={onClickMock} />);
		await userEvent.type(screen.getByRole('button'), '{Enter}');
		expect(onClickMock).toHaveBeenCalledTimes(0);
	});

	it('should apply the className prop', () => {
		render(
			<ComboboxClearButton
				className={className}
				editable
				search={search}
				onClick={onClickMock}
			/>
		);
		expect(screen.getByRole('button')).toHaveClass(className);
	});

	it('should be disabled when search is empty', () => {
		render(<ComboboxClearButton editable search="" onClick={onClickMock} />);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should not be disabled when search is not empty', () => {
		render(
			<ComboboxClearButton editable search={search} onClick={onClickMock} />
		);
		expect(screen.getByRole('button')).not.toBeDisabled();
	});
});
