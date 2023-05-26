import { render, fireEvent } from '@testing-library/react';
import CloseOrSkip from './close-or-skip';
import { describe, it, expect, vi } from 'vitest';
describe('CloseOrSkip', () => {
	it('displays "Correct" button when bloc is true and calls onClose when clicked', () => {
		const onClose = vi.fn();
		const onSkip = vi.fn();
		const { getByText, queryByText } = render(
			<CloseOrSkip onClose={onClose} onSkip={onSkip} isCritical />
		);

		expect(queryByText('Ignore')).toBeNull();
		fireEvent.click(getByText('Correct'));
		expect(onClose).toHaveBeenCalled();
	});
	it('displays both "Correct" and "Ignore" buttons when bloc is false and calls onClose or onSkip when clicked', () => {
		const onClose = vi.fn();
		const onSkip = vi.fn();
		const { getByText } = render(
			<CloseOrSkip onClose={onClose} onSkip={onSkip} />
		);

		fireEvent.click(getByText('Correct'));
		expect(onClose).toHaveBeenCalled();

		fireEvent.click(getByText('Ignore'));
		expect(onSkip).toHaveBeenCalled();
	});
});
