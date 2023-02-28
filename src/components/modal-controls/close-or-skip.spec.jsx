import { render, fireEvent } from '@testing-library/react';
import CloseOrSkip from './close-or-skip';
import { describe, it, expect, vi } from 'vitest';
describe('CloseOrSkip', () => {
	it('displays "Correct" button when bloc is true and calls onClose when clicked', () => {
		const onClose = vi.fn();
		const onSkip = vi.fn();
		const errors = {
			errorArray: [
				{
					criticality: 'ERROR',
					typeOfControl: 'FORMAT',
					message: 'Error message',
				},
			],
		};
		const { getByText, queryByText } = render(
			<CloseOrSkip errors={errors} onClose={onClose} onSkip={onSkip} />
		);

		expect(queryByText('Ignore')).toBeNull();
		fireEvent.click(getByText('Correct'));
		expect(onClose).toHaveBeenCalled();
	});
	it('displays both "Correct" and "Ignore" buttons when bloc is false and calls onClose or onSkip when clicked', () => {
		const onClose = vi.fn();
		const onSkip = vi.fn();
		const errors = {
			errorArray: [
				{
					criticality: 'WARNING',
					typeOfControl: 'FORMAT',
					message: 'Warning message',
				},
			],
		};
		const { getByText } = render(
			<CloseOrSkip errors={errors} onClose={onClose} onSkip={onSkip} />
		);

		fireEvent.click(getByText('Correct'));
		expect(onClose).toHaveBeenCalled();

		fireEvent.click(getByText('Ignore'));
		expect(onSkip).toHaveBeenCalled();
	});
});
