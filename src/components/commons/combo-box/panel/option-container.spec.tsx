import { render } from '@testing-library/react';
import { OptionContainer } from './option-container';
import { expect, it, describe, vi } from 'vitest';

describe('option-container', () => {
	const props = {
		children: 'Option 1',
		index: 0,
		selected: false,
		onSelect: vi.fn(),
	};
	it('renders without crashing', () => {
		const { getByRole } = render(<OptionContainer {...props} />);
		const optionContainer = getByRole('option');

		expect(optionContainer).toBeInTheDocument();
	});
});
