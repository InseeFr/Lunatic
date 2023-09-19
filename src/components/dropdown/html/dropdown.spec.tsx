import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Dropdown from './dropdown';

describe('Dropdown', () => {
	const mockOnSelect = vi.fn();

	beforeEach(() => {
		mockOnSelect.mockClear();
	});

	it('renders without crashing', () => {
		const { container } = render(
			<Dropdown
				value="toto"
				id="dropdown"
				aria-labelledby="dropdown"
				onSelect={mockOnSelect}
				options={[
					{
						value: 'toto',
						description: 'toto',
						label: 'toto',
					},
				]}
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('should handle readOnly', () => {
		const { container } = render(
			<Dropdown
				id="dropdown"
				value="toto"
				readOnly
				onSelect={mockOnSelect}
				options={[
					{
						value: 'toto',
						description: 'toto',
						label: 'toto label',
					},
				]}
			/>
		);
		expect(container).toMatchSnapshot();

		const selection = container.querySelector('.lunatic-combo-box-content');
		(selection as HTMLElement).focus();
		expect(selection).toHaveFocus();
		const span = selection?.querySelector('span');
		expect(span).toHaveTextContent('toto label');
	});
});
