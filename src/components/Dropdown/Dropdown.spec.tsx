import { fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
	const mockOnSelect = vi.fn();

	const baseProps = {
		value: 'value1',
		id: 'dropdown',
		'aria-labelledby': 'dropdown',
		options: [
			{
				value: 'value1',
				description: 'description 1',
				label: 'option 1',
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
		expect(span).toHaveTextContent('option 1');
	});

	it('should display only options label in dropdown selection', () => {
		const { container, queryByText, getByText } = render(
			<Dropdown
				{...baseProps}
				value={null}
			/>
		);

		const selection = container.querySelector('.lunatic-combo-box-content');
		fireEvent.focus(selection as HTMLElement);

		expect(getByText('option 1')).toBeInTheDocument();
		expect(queryByText('value1')).not.toBeInTheDocument();
		expect(queryByText('description 1')).not.toBeInTheDocument();
	});
});
