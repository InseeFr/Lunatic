import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
	const mockOnChange = vi.fn();

	const baseProps = {
		value: 'input',
		id: 'input',
		'aria-labelledby': 'input',
		handleChanges: mockOnChange,
		response: { name: 'demo' },
	};

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it('renders without crashing', () => {
		const { container } = render(<Textarea {...baseProps} />);
		expect(container).toMatchSnapshot();
	});

	it('renders characters count if there is a maximum length', () => {
		const labelText = 'Enter a number';
		const { container } = render(
			<Textarea
				{...baseProps}
				label={labelText}
				maxLength={30}
				errors={undefined}
			/>
		);

		const charactersCount = container.querySelector('#characters-count-input');
		expect(charactersCount).toBeInTheDocument();
		expect(charactersCount).toHaveTextContent('5/30');
	});

	it('does not render characters count if there is no maximum length', () => {
		const labelText = 'Enter a number';
		const { container } = render(
			<Textarea {...baseProps} label={labelText} errors={undefined} />
		);

		const charactersCount = container.querySelector('#characters-count-input');
		expect(charactersCount).not.toBeInTheDocument();
	});

	it('should handle readOnly', () => {
		const { container } = render(
			<Textarea
				{...baseProps}
				id="textarea"
				value={
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				}
				readOnly
			/>
		);
		expect(container).toMatchSnapshot();

		const input = container.querySelector('textarea');
		expect(input).toHaveAttribute('readonly');
		(input as HTMLElement).focus();
		expect(input).toHaveFocus();
		expect(input).toHaveValue(
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		);
	});
});
