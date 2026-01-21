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

	OTHER_VALUE: 'OTHER',
}));

const FAKE_PLACE_HOLDER = 'place holder...';
// Mock of CustomSuggester
vi.mock('./CustomSuggester', () => ({
	CustomSuggester: vi.fn(({ value }) => (
		<div data-testid="custom-suggester">
			{Array.isArray(value) && value.length > 0
				? (value[0].value ?? FAKE_PLACE_HOLDER)
				: FAKE_PLACE_HOLDER}
		</div>
	)),
}));

describe('WrappedSuggester useEffect', () => {
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
	it('should display place holder when no value is set', () => {
		// Given the composant initialize

		const { rerender } = render(
			<WrappedSuggester {...initialProps} value={null} />
		);
		const suggesterValue = screen.getByTestId('custom-suggester').textContent;
		expect(suggesterValue).toContain(FAKE_PLACE_HOLDER);

		const forcedValue = 'FORCED value';

		// When we change the value
		const newProps = { ...initialProps, value: forcedValue };
		rerender(<WrappedSuggester {...newProps} />);

		// Then selectedOptions, i.e value props of customSuggester have to be updated
		const updatedValue = screen.getByTestId('custom-suggester').textContent;
		expect(updatedValue).toContain('FORCED value');
	});

	it('should update selectedOptions when value prop changes', () => {
		// Given the composant initialize
		const { rerender } = render(<WrappedSuggester {...initialProps} />);
		const suggesterValue = screen.getByTestId('custom-suggester').textContent;
		expect(suggesterValue).toContain('initialValue');

		const forcedValue = 'FORCED value';

		// When we change the value
		const newProps = { ...initialProps, value: forcedValue };
		rerender(<WrappedSuggester {...newProps} />);

		// Then selectedOptions, i.e value props of customSuggester have to be updated
		const updatedValue = screen.getByTestId('custom-suggester').textContent;
		expect(updatedValue).toContain('FORCED value');
	});

	it('should update selectedOptions when value prop is set to null', () => {
		// Given the composant initialize
		const { rerender } = render(<WrappedSuggester {...initialProps} />);
		const suggesterValue = screen.getByTestId('custom-suggester').textContent;
		expect(suggesterValue).toContain('initialValue');

		const forcedValue = null;

		// When we change the value
		const newProps = { ...initialProps, value: forcedValue };
		rerender(<WrappedSuggester {...newProps} />);

		// Then selectedOptions, i.e value props of customSuggester have to be updated
		const updatedValue = screen.getByTestId('custom-suggester').textContent;
		expect(updatedValue).toContain(FAKE_PLACE_HOLDER);
	});

	it('should update selectedOptions when value prop is set to an empty string ("")', () => {
		// Given the composant initialize
		const { rerender } = render(<WrappedSuggester {...initialProps} />);
		const suggesterValue = screen.getByTestId('custom-suggester').textContent;
		expect(suggesterValue).toContain('initialValue');

		const forcedValue = '';
		// When we change the value
		const newProps = { ...initialProps, value: forcedValue };
		rerender(<WrappedSuggester {...newProps} />);

		// Then selectedOptions, i.e value props of customSuggester have to be updated
		const updatedValue = screen.getByTestId('custom-suggester').textContent;
		expect(updatedValue).toContain(FAKE_PLACE_HOLDER);
	});
});
