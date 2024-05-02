import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
	const mockOnSelect = vi.fn();

	const baseProps = {
		value: 'toto',
		id: 'dropdown',
		'aria-labelledby': 'dropdown',
		options: [
			{
				value: 'toto',
				description: 'toto',
				label: 'toto',
			},
		],
		response: { name: 'demo' },
		handleChanges: mockOnSelect,
	};

	beforeEach(() => {
		mockOnSelect.mockClear();
	});

	it('renders without crashing', () => {
		const { container } = render(<Dropdown {...baseProps} />);
		expect(container).toMatchSnapshot();
	});

	it('should handle readOnly', () => {
		const { container } = render(<Dropdown {...baseProps} readOnly />);
		expect(container).toMatchSnapshot();

		const selection = container.querySelector('.lunatic-combo-box-content');
		(selection as HTMLElement).focus();
		expect(selection).toHaveFocus();
		const span = selection?.querySelector('span');
		expect(span).toHaveTextContent('toto');
	});
});
