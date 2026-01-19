import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedSuggester } from './Suggester';

// Mock of useSuggestions
vi.mock('./useSuggestions', () => ({
	useSuggestions: vi.fn(() => ({
		state: 'success',
		options: [],
		search: '',
		setSearch: vi.fn(),
		onFocus: vi.fn(),
		onBlur: vi.fn(),
		getSelectedLabelById: vi.fn(),
	})),

	useStore: vi.fn(() => ({
		store: {},
		storeState: 'success',
		setStoreState: vi.fn(),
		getLabelById: vi.fn(),
	})),
}));

// Mock of CustomSuggester
vi.mock('./CustomSuggester', () => ({
	CustomSuggester: vi.fn(({ value }) => (
		<div data-testid="custom-suggester">{JSON.stringify(value)}</div>
	)),
}));

describe('WrappedSuggester useEffect', () => {
	it('should update selectedOptions when value prop changes', () => {
		// Given initial props
		const initialProps = {
			storeName: 'store',
			id: 'suggester-1',
			className: '',
			handleChanges: vi.fn(),
			disabled: false,
			value: 'initialValue',
			label: 'Label',
			declarations: [],
			description: '',
			errors: {},
			readOnly: false,
			response: { name: 'response' },
			optionResponses: [{ name: 'labelResponse', attribute: 'label' }],
			executeExpression: vi.fn(),
			iteration: 1,
			arbitrary: { response: { name: 'ARBITRARY' } },
			optionRenderer: vi.fn(),
			labelRenderer: vi.fn(),
			focused: false,
		};

		// Given the composant initialize
		const { rerender } = render(<WrappedSuggester {...initialProps} />);
		const suggesterValue = screen.getByTestId('custom-suggester').textContent;
		expect(suggesterValue).toContain('initialValue');

		// When we change the value
		const newProps = { ...initialProps, value: 'FORCED value' };
		rerender(<WrappedSuggester {...newProps} />);

		// Then selectedOptions, i.e value props of customSuggester have to be updated
		const updatedValue = screen.getByTestId('custom-suggester').textContent;
		expect(updatedValue).toContain('FORCED value');
	});
});
