import { fireEvent, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomSuggester } from './CustomSuggester';

const baseProps = {
	id: 'suggester-1',
	state: 'success' as const,
	value: [] as [],
	options: [],
	search: '',
	onSelect: vi.fn(),
	onBlur: vi.fn(),
	onFocus: vi.fn(),
	onSearch: vi.fn(),
	onClear: vi.fn(),
	optionRenderer: vi.fn(),
	labelRenderer: vi.fn(),
};

describe('CustomSuggester', () => {
	it('should handle required', () => {
		const { container } = render(<CustomSuggester {...baseProps} required />);

		// expand combobox for having the input
		const content = container.querySelector('.lunatic-combo-box-content');
		fireEvent.click(content!);

		const input = container.querySelector('input[type="text"]');
		expect(input).toHaveAttribute('required');
		expect(input).toHaveAttribute('aria-required', 'true');
	});
});
